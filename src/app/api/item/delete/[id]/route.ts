import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";


export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    const reqBody = await request.json()
    const paramsId = (await params).id
    try {
        await connectDB()

        const singleItem = await ItemModel.findById(paramsId)
        if(singleItem) {
            if(singleItem.email === reqBody.email) {
                await ItemModel.deleteOne({_id: paramsId})
                return NextResponse.json({message: "アイテム削除成功"})
            } else {
                return NextResponse.json({message: "他の人が作成したアイテムです。"})
            }
        } else {
            return NextResponse.json({message: "アイテムが見つかりません"})

        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "アイテム削除失敗"})
        
    }
}