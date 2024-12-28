import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

// 動的ルートのパラメータ型
interface Params {
    id: string; // 動的ルートの "id" パラメータ
  }
  
  // context の型
  interface Context {
    params: Params; // 動的ルートのパラメータ
  }
export async function PUT(request: Request, context: Context) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const params = await context.params
        await ItemModel.updateOne({_id: params.id}, reqBody)
        return NextResponse.json({message: "アイテム編集成功"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "アイテム編集失敗"})
        
    }
}