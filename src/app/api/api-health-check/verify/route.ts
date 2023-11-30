import {InternalErrorResponse, SuccessResponse} from '@/util/apiResponse';
import {NextResponse} from 'next/server';

export async function GET() {
  const taskName = 'HEALTH-CHECK';
  const res: any = NextResponse;
  try {
    //returns the success response
    // return NextResponse.json({ message: 'GET request handled successfully' }, { status: 400 });

    return new SuccessResponse('success', 'api(s) is working...').send();
  } catch (err) {
    console.error(`${taskName}_ERROR`, err);
    const response = new InternalErrorResponse('An unexpected error has occurred');
    response.send();
  }
}
