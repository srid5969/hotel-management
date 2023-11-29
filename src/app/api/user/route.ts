import prisma from '@/config/db';
import {NextApiRequest} from 'next';
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import { InternalErrorResponse } from '@/util/apiResponse';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface MyData {
  email: string;
  phoneNumber: string;
  password: string;
}

export async function GET() {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      phoneNumber: true,
      posts: true,
      primaryAddress: true,
    },
  });

  return NextResponse.json({data: allUsers});
  //http://localhost:3000/api/user {data:"all"}
}
export async function POST(request: NextRequest) {
  try {
    const body: MyData = await request.json(); // This get's the raw body as a string
    body.password = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({data: body});
  
    return NextResponse.json({data: user, message: 'Success'});
  } catch (error:any) {
    if(error instanceof PrismaClientKnownRequestError)
      if (error.code === 'P2002') 
      return new InternalErrorResponse('Error at '+ error?.meta?.target).send()
        return new InternalErrorResponse('There is a unique constraint violation, a new user cannot be created with this email').send()
      return new InternalErrorResponse(error?.message||"Unexpected error").send()
  }
 
  //http://localhost:3000/api/user {data:"all"}
}
