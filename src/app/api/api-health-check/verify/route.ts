import { InternalErrorResponse, SuccessResponse } from '@/util/apiResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const taskName = 'HEALTH-CHECK';
  try {
    //returns the success response
    res.status(200).json({ message: 'GET request handled successfully' });

    // new SuccessResponse(res, 'success', 'api(s) is working...').send();
  } catch (err) {
    console.error(`${taskName}_ERROR`, err);
    const response = new InternalErrorResponse(res, 'An unexpected error has occurred');
    response.send();
  }
}
export async function GET()   {
  const taskName = 'HEALTH-CHECK';
  const res: any = NextResponse;
  try {
    //returns the success response
    // return NextResponse.json({ message: 'GET request handled successfully' }, { status: 400 });

    return new SuccessResponse(res, 'success', 'api(s) is working...').send();
  } catch (err) {
    console.error(`${taskName}_ERROR`, err);
    const response = new InternalErrorResponse(res, 'An unexpected error has occurred');
    response.send();
  }
}
