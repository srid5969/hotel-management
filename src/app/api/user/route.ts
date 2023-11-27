import prisma from "@/config/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

interface MyData {
    email: string;
    phoneNumber: string;
  }
  
export async function GET() {
    const allUsers = await prisma.user.findMany()

    return NextResponse.json({data:allUsers})
    //http://localhost:3000/api/user {data:"all"}
}
export async function POST(request:NextRequest) {
    const body :MyData= await request.json(); // This get's the raw body as a string
    const user = await prisma.user.create({data:body})

    return NextResponse.json({data:user})
    //http://localhost:3000/api/user {data:"all"}
}