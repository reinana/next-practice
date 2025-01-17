import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
    // const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTczNTYwMzE3MX0.MmRmVV91Gi2-REIoV1486sJF87Jt8FnQPvAqZ2oRU4U"
    const token = await request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
        // トークンがない場合、ログインページにリダイレクト
        const url = new URL("/user/login", request.url); // 絶対パスを指定
        return NextResponse.redirect(url);
    }

    try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJwt = await jwtVerify(token, secretKey);
        console.log("decodedJwt", decodedJwt);
        return NextResponse.next();
    } catch (error) {
        console.log(error);
        // トークンが無効な場合もログインページにリダイレクト
        const url = new URL("/user/login", request.url); // 絶対パスを指定
        return NextResponse.redirect(url);
    }
}
export const config = {
    matcher: [
        "/api/item/create",
        "/api/item/update/:path*",
        "/api/item/delete/:path*",
        "/item/create",
        "/item/update/:path*",
        "/item/delete/:path*"
    ],
};
