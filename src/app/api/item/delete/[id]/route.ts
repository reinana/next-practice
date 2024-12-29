import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

interface Params {
    id: string;
}
interface Context {
    params: Params;
}
export async function DELETE(request: Request, context: Context) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const params = await context.params
        const singleItem = await ItemModel.findById(params.id)
        if(singleItem) {
            if(singleItem.email === reqBody.email) {
                await ItemModel.deleteOne({_id: params.id})
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