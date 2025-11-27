import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'API is healthy and running!' })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ success: true, data: body })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
