import { signIn } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { provider, credentials } = body
    
    await signIn(provider, { 
      ...credentials,
      redirect: false 
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 })
  }
}