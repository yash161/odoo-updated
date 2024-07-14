import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/UserModel'
import { NextResponse,NextRequest } from 'next/server'
import { sendEmail } from '@/helpers/sendVerification'

export async function POST(request : NextRequest) {
    await dbConnect()

    try {

        const reqBody = await request.json()
        const {username,email,password} = reqBody

        const user = await UserModel.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password,salt)
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()


        const newUser = new UserModel({
            username,
            email,
            password:hasedPassword,
            verifyCode
        })

        await newUser.save()

        const sendEmailResponse = await sendEmail(email,username,verifyCode)

        if(!sendEmailResponse.success){
            return NextResponse.json({
                success : false,
                message : "Error Occure While Sending Email"
            },{
                status : 400
            }
        )
        }

        return NextResponse.json({
            success : true,
            message : "Sign-up successfully"
        })

        
    } catch (error) {
        console.log('Error registering user: ',error);
        return NextResponse.json({
            success : false,
            mesaage : "Error registering user"
        },
        {
            status : 500
        }
    )
        
    }
}