import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function PUT(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const id = (await params).id
        const singleItem = await ItemModel.findById(id)
        if (singleItem) {
            if(singleItem.email === reqBody.email) {
                await ItemModel.updateOne({_id: id}, reqBody)
                return NextResponse.json({message: "アイテム編集成功"})
                
            } else {
                
                return NextResponse.json({message: "他の人が作成したアイテムです"})
            }
        } else {
            return NextResponse.json({message: "アイテムが見つかりません"})

        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "アイテム編集失敗"})
        
    }
}