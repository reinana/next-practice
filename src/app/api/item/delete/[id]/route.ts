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
    try {
        await connectDB()
        const params = await context.params
        await ItemModel.deleteOne({_id: params.id})
        return NextResponse.json({message: "アイテム削除成功"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "アイテム削除失敗"})
        
    }
}