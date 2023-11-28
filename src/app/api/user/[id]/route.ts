import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest, context: any) {
  return NextResponse.json({data: {param: context.params}});
  // http://localhost:3000/api/user/1 {"data":{"param":{"id":"1"}}}
}
