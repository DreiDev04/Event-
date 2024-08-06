import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";

export async function PUT(
  req: NextRequest,
  { userId, groupId }: { userId: string; groupId: string }
) {
  try {
    const auth = getAuth(req);

    if (!auth || !auth.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { role } = body;

    const user = await prisma.groupMember.update({
      where: {
        userId_groupId: {
          userId: userId,
          groupId: groupId,
        },
      },
      data: {
        role: role,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error making user an admin:", error);
    return NextResponse.json({ message: "Failed to make user an admin" }, { status: 500 });
  }
}