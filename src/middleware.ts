import { NextApiRequest } from 'next';
import { isAuthenticated } from '@/util/auth';
 import { NextResponse } from 'next/server';


 
export async function middleware(request: NextApiRequest) {
  // Call our authentication function to check the request
  let accessToken = request.headers.authorization;
              if (!accessToken) {
                return NextResponse.json({message:"Token not fount"},{status:404})
              }
              if (accessToken?.search('Bearer') !== -1) {
                accessToken = accessToken.replace('Bearer ', '');
              }
              const authenticated=await isAuthenticated(accessToken)
  if (!authenticated) {
    // Respond with JSON indicating an error message
    return Response.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    )
  }
}