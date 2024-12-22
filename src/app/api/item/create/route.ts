import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function POST(request: Request) {
    const reqBody = await request.json()
    // console.log(reqBody)

    try {

        await connectDB()
        await ItemModel.create(reqBody)
        return NextResponse.json( {message: "アイテム作成"})

    } catch(error) {
        console.log(error)
        return NextResponse.json( {message: "アイテム作成失敗"} )
    }
}

// mongodb+srv://maronana30:<db_password>@cluster0.srgfu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0