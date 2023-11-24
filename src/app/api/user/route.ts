import { prisma } from "@/config/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function GET() {
    const allUsers = await prisma.user.findMany()

    return NextResponse.json({data:allUsers})
    //http://localhost:3000/api/user {data:"all"}
}
export async function POST(request:NextApiRequest) {
    const allUsers = await prisma.user.create({data:{  }})

    return NextResponse.json({data:allUsers})
    //http://localhost:3000/api/user {data:"all"}
}