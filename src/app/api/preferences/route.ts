import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import PreferencesModel from '@/models/PreferencesModel';
import { getIdFromToken } from '@/helpers/getIdFromToken';
import UserModel from '@/models/UserModel';

export async function POST(request: NextRequest) {
    
await dbConnect();

  try {
    const reqBody = await request.json();
    const { authors, genre } = reqBody;
    const userId = await getIdFromToken(request)

    const user = await UserModel.findOne({_id : userId})

    if(!user){
      return NextResponse.json({
        success : false,
        message : "User Not Found"
      },{
        status : 400
      })
    }

    if (!authors || !genre) {
      return NextResponse.json({
        success: false,
        message: 'Authors and genre are required',
        status: 400
      });
    }

    user.interest.push(genre)
    user.author.push(authors)

    await user.save()

    return NextResponse.json({
      success: true,
      data: user,
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
