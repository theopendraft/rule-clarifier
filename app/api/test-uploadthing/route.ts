import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.UPLOADTHING_TOKEN;
  
  return NextResponse.json({
    hasToken: !!token,
    tokenLength: token?.length || 0,
    tokenStart: token?.substring(0, 20) || 'No token'
  });
}