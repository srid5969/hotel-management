import { prisma } from "@/config/db";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET() {
    const allUsers = await prisma.user.findMany()

    return NextResponse.json({data:allUsers})
    //http://localhost:3000/api/user {data:"all"}
}