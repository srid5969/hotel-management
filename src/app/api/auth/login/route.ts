import prisma from "@/config/db";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { jwtSecretKey } from "@/config/app";

export async function POST(request:NextRequest) {
    const body:{email:string,password:string}= await request.json(); 
    console.log(body);
    const user:any = await prisma.user.findFirst({where:{email:body.email}})
    if(!user)    return NextResponse.json({data:null,message:"User not found"})
    const match  =await bcrypt.compare(body.password, user.password)
    if(!match) return NextResponse.json({data:null,message:"Password is incorrect"})
    delete user.password
    const token=jwt.sign({id:user.id,email:user.email},jwtSecretKey);
    return NextResponse.json({data:{accessToken:token,...user},message:"Success"})
    //http://localhost:3000/api/user {data:"all"}
}   