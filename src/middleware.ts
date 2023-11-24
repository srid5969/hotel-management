import { NextRequest } from 'next/server'
import { isAuthenticated } from './util/auth'
import { NextApiRequest, NextApiResponse,NextResponse } from 'next'
import { withAuth } from "next-auth/middleware"

// import { isAuthenticated } from '@lib/auth'
 

 
export function middleware(request: NextApiRequest) {
  // Call our authentication function to check the request
  let accessToken = request.headers.authorization;
              if (!accessToken) {
                return NextResponse.
              }
              if (accessToken?.search('Bearer') !== -1) {
                accessToken = accessToken.replace('Bearer ', '');
              }
  if (!isAuthenticated(request.headers.authorization)) {
    // Respond with JSON indicating an error message
    return Response.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    )
  }
}