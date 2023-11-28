import {NextApiRequest} from 'next';
import {isAuthenticated} from '@/util/auth';
import {NextRequest, NextResponse} from 'next/server';

export const config = {
  // matcher: [
  //   // '/((?!api/api-health-check/verify|_next/static|_next/image|favicon.ico).*)',
  //   // '/api/:function*',
  //   '/api/:function*|((?!api/api-health-check/verify|_next/static|_next/image|favicon.ico).*)',
  //       ]
};
export async function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  const url: string = request.nextUrl.pathname;
  const authNotRequuiredUrls = ['/api/api-health-check/verify', '/api/auth/login', '/api/user'];
  if (authNotRequuiredUrls.includes(url)) return NextResponse.next();
  if (!url.startsWith('/api')) return NextResponse.next();
  let accessToken = request.headers.get('authorization');
  if (!accessToken) {
    return NextResponse.json({data: null, message: 'Token not found'}, {status: 404});
  }
  if (accessToken?.search('Bearer') !== -1) {
    accessToken = accessToken.replace('Bearer ', '');
  }
  const authenticated = await isAuthenticated(accessToken);
  if (!authenticated) {
    // Respond with JSON indicating an error message
    return Response.json({success: false, data: null, message: 'authentication failed'}, {status: 401});
  }
  return NextResponse.next();
}
