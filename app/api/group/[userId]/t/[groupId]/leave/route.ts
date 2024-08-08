import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string; groupId: string } }
) {
  try {
    const auth = getAuth(req);
    const { groupId, userId } = params;

    if (!auth || !auth.userId || auth.userId !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    const user = await prisma.groupMember.findFirst({
      where: { groupId, userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User is not a member of this group" },
        { status: 404 }
      );
    }

    if (user.role === "CREATOR") {
      return NextResponse.json(
        { message: "Creator cannot leave the group" },
        { status: 400 }
      );
    }

    await prisma.groupMember.delete({
      where: { id: user.id },
    });

    return NextResponse.json({ message: "User successfully left the group" });

  } catch (error) {
    return NextResponse.json(
      { message: "An unexpected error occurred", error: (error as Error).message },
      { status: 500 }
    );
  }
}
