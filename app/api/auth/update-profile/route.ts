import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function PUT(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Verify authentication
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { firstName, lastName, company, timezone } = await request.json()

    // Update user profile
    const profile = await prisma.userProfile.update({
      where: { id: session.user.id },
      data: {
        firstName,
        lastName,
        company,
        timezone,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

