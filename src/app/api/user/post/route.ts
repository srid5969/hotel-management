import prisma from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body  = await request.json(); // This get's the raw body as a string
    const post = await prisma.post.create({data: body});
  
    return NextResponse.json({data: post, message: 'Success'});
    //http://localhost:3000/api/user {data:"all"}
  }
  