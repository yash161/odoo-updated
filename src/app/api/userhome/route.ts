import { getIdFromToken } from "@/helpers/getIdFromToken";
import UserModel from "@/models/UserModel";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const userId = await getIdFromToken(request);
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ success: false, message: "User does not exist" }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
