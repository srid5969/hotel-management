import { NextResponse } from "next/server";


export async function GET() {
    return NextResponse.json({data:"all"})
    //http://localhost:3000/api/user {data:"all"}
}