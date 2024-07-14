import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import PreferencesModel from '@/models/PreferencesModel';

export async function POST(request: NextRequest) {
    
await dbConnect();

  try {
    const reqBody = await request.json();
    const { authors, genre } = reqBody;

    if (!authors || !genre) {
      return NextResponse.json({
        success: false,
        message: 'Authors and genre are required',
        status: 400
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
      status: 201
    });
  } catch (error: any) {
    console.error('Error saving preferences:', error);
    return NextResponse.json({
      success: false,
      message: 'Error saving preferences',
      status: 500
    });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed',
    status: 405
  });
}
