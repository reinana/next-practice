import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const reqBody = await request.json()
    // console.log(reqBody)

    try {
        await connectDB()
        const savedUserData = await UserModel.findOne({email: reqBody.email})
        console.log(savedUserData)
        if(savedUserData) {
            // ユーザーデータが存在するとき
            if(reqBody.password === savedUserData.password) {
                // パスワードが合っているとき
                const secretKey = new TextEncoder().encode("next-market-app-book")
                const payload = {
                    email: reqBody.email,
                }

                const token = await new SignJWT(payload)
                                .setProtectedHeader({alg: "HS256"}) // アルゴリズム
                                .setExpirationTime("1d") // 期間1day
                                .sign(secretKey)
                console.log(token)
                return NextResponse.json({message: "ログイン成功", token: token})
            } else {
                // パスワードが間違っているとき
                return NextResponse.json({message: "ログイン失敗 パスワードが間違っています"})
                
            }
        } else {
            // ユーザーデータが存在しないとき
            return NextResponse.json({message: "ログイン失敗 ユーザー登録をしてください"})

        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "ログイン失敗"})
        
    }
}