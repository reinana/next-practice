import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";
// // 動的ルートのパラメータ型
// interface Params {
//     id: string; // 動的ルートの "id" パラメータ
//   }
  
//   // context の型
//   interface Context {
//     params: Params; // 動的ルートのパラメータ
//   }

export async function GET(request: Request, context: { params: any; }) {
    const params = await context.params
    // console.log(params.id)
    try {
        
        await connectDB
        const singleItem = await ItemModel.findById(params.id)
        return NextResponse.json({message: "アイテム読み取り成功（シングル）", singleItem: singleItem})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "アイテム読み取り失敗"})
        
    }
}