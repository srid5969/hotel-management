import prisma from "@/config/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";


interface MyData {
    email: string;
    phoneNumber: string;
    password: string;
  }
  
export async function GET() {
    const allUsers = await prisma.user.findMany({select:{
        email:true,phoneNumber:true,posts:true
    }})

    return NextResponse.json({data:allUsers})
    //http://localhost:3000/api/user {data:"all"}
}
export async function POST(request:NextRequest) {
    const body :MyData= await request.json(); // This get's the raw body as a string
    body.password=await bcrypt.hash(body.password, 10)
    const user = await prisma.user.create({data:body})

    return NextResponse.json({data:user,message:"Success"})
    //http://localhost:3000/api/user {data:"all"}
}