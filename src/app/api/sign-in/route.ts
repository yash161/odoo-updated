import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/UserModel'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request : NextRequest){
    await dbConnect()

    try {

        const reqBody = await request.json()

        const {email,password} = reqBody

        const user = await UserModel.findOne({email})

        if(!user) {
            return Response.json({success : false , message : "User not found"},{status : 400})
        }
        if(!user.isVerify){
            return Response.json({success : false , message : "Please Verify User First"}, {status : 400})
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password)

        if(!isPasswordCorrect) {
            return Response.json({success : false , message : "Password Is Incorrect"},{status : 400})
        }

        const tokenData = {
            id : user._id,
            isVerify : user.isVerify,
            isAdmin : user.isAdmin,
            isLibrarian : user.isLibrarian
        }

        const response = NextResponse.json({
            message : "Login Successfully",
            success : true,
            data:user
        })

        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn : '1d'})

        response.cookies.set("token",token,{
            httpOnly : true
        })

        return response


        
    } catch (error) {
        return Response.json({
            success : false,
            message : "Error In Login"
        },
    {status : 500})
    }
}