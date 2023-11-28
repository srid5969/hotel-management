import {NextResponse} from 'next/server';

export async function GET() {
  return NextResponse.json({hello: 'world'});
  //http://localhost:3000/api
}
