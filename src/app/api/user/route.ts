import prisma from '@/config/db';
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import {InternalErrorResponse} from '@/util/apiResponse';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';

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
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to users
 * /api/user:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user
 *     description: Endpoint to create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: example@gmail.com
 *               phoneNumber:
 *                 type: string
 *                 default: 1234-123-1234
 *               password:
 *                 type: string
 *                 default: Test@123
 *       headers:
 *         X-Custom-Header:
 *           description: Custom header description
 *           schema:
 *             type: string
 *           example: CustomHeaderValue123
 *     responses:
 *       200:
 *         description: Successful creation of a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *               example:
 *                 message: User created successfully
 *                 data:
 *                   id: 12
 *                   email: example@gmail.com
 *                   phoneNumber: 1234-123-1234
 *       400:
 *         description: Bad request or invalid input data
 */

export async function POST(request: NextRequest) {
  try {
    const body: MyData = await request.json(); // This get's the raw body as a string
    body.password = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({data: body});

    return NextResponse.json({data: user, message: 'Success'});
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') return new InternalErrorResponse('Error at ' + error?.meta?.target).send();
    return new InternalErrorResponse('There is a unique constraint violation, a new user cannot be created with this email').send();
  }

  //http://localhost:3000/api/user {data:"all"}
}
