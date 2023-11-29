import prisma from '@/config/db';
import {NextRequest, NextResponse} from 'next/server';
/**
 * @swagger
 * /api/user:
 *   post:
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
 *     responses:
 *       200:
 *         description: Successful creation of a user
 *       400:
 *         description: Bad request or invalid input data
 */

export async function POST(request: NextRequest) {
  const body = await request.json(); // This get's the raw body as a string
  const post = await prisma.post.create({data: body});

  return NextResponse.json({data: post, message: 'Success'});
  //http://localhost:3000/api/user {data:"all"}
}
