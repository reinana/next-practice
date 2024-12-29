import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }>}) {
    const paramsId = (await params).id
    try {
        
        await connectDB
        const singleItem = await ItemModel.findById(paramsId)
        return NextResponse.json({message: "アイテム読み取り成功（シングル）", singleItem: singleItem})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "アイテム読み取り失敗"})
        
    }
}