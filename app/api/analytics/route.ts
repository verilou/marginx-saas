import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const action = searchParams.get('action');

  const response = await fetch(
    `https://qb9i93v96j.execute-api.eu-north-1.amazonaws.com/default/analytics?action=${action}`
  );

  const analytics = await response.json();

  return new NextResponse(JSON.stringify(analytics));
};
