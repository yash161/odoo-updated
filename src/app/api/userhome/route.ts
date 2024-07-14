
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dbConnect from '@/lib/dbConnect';
import PreferencesModel from '@/models/PreferencesModel';
import User from '@/models/UserModel'
import UserModel from '@/models/UserModel';
dbConnect();

export function getIdFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decoded.id;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { authors, genre } = reqBody;

    if (!authors || !genre) {
      return NextResponse.json({
        success: false,
        message: 'Authors and genre are required',
        status: 400,
      });
    }

    const newPreferences = new PreferencesModel({
      authors,
      genre,
    });

    await newPreferences.save();

    return NextResponse.json({
      success: true,
      data: newPreferences,
      status: 201,
    });
  } catch (error: any) {
    console.error('Error saving preferences:', error);
    return NextResponse.json({
      success: false,
      message: 'Error saving preferences',
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getIdFromToken(request);
    console.log(userId)
    const user = await User.findById(userId);
    console.log("user",user)
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
        status: 404,
      });
    }

    const { authors, genre } = user.interests; // assuming interests field in user schema

    const url = 'https://openlibrary.org/subjects/fiction.json?limit=100';
    const response = await axios.get(url);
    const books = response.data.works;

    const filteredBooks = books.filter((book: any) => {
      const matchesAuthor = book.authors.some((author: any) =>
        authors.includes(author.name)
      );
      const matchesGenre = book.subjects.includes(genre);
      return matchesAuthor && matchesGenre;
    });

    return NextResponse.json({
      success: true,
      data: filteredBooks,
    });
  } catch (error: any) {
    console.error('Error fetching books:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching books',
      status: 500,
    });
  }
}
