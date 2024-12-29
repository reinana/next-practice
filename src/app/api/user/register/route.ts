import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const reqBody = await request.json()
    // console.log(reqBody)

    try {
        await connectDB()
        await UserModel.create(reqBody)
        return NextResponse.json( {message: "ユーザー登録成功"})

    } catch(error) {
        console.log(error)
        return NextResponse.json( {message: "ユーザー登録失敗"} )
    }
}