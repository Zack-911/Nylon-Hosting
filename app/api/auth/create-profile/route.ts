import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Verify authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId, email, firstName, lastName } = await request.json()

    // Verify the user is creating their own profile
    if (session.user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create or update user profile
    const profile = await prisma.userProfile.upsert({
      where: { id: userId },
      update: {
        firstName,
        lastName,
      },
      create: {
        id: userId,
        email,
        firstName,
        lastName,
      },
    })

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error("Error creating profile:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

