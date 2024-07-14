import UserModel from "@/models/UserModel";
import { NextRequest,NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(request : NextRequest){
    await dbConnect()
    try {

        const reqBody = await request.json()

        const {code} = reqBody
        
        const {searchParams} = new URL(request.url) // this is the way to get the query parameter value from url
       
        const username = searchParams.get('username')

        const user = await UserModel.findOne({username})

        if(!username){
            return NextResponse.json({
                success : false,
                message : "Sorry Username Does Not exist"
            },{
                status : 400
            })
        }

        const isCodeMatch = code === user.verifyCode
        
        if(!isCodeMatch){
            return NextResponse.json({
                success : false,
                message : "Sorry Code Does Not exist"
            },{
                status : 400
            })
        }
        user.isVerify = true

        await user.save()
        return NextResponse.json({
            success : true,
            message : "Verified SuccessFully"
        },{
            status : 200
        })
        
    } catch (error) {
        return NextResponse.json({
            success : false,
            message : "Sorry Not Check Again"
        },{
            status : 500
        })
    }
}