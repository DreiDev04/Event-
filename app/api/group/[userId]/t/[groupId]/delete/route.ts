import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";

export async function DELETE(
  req: NextRequest,
  {
    params: { groupId, userId },
  }: { params: { groupId: string; userId: string } }
) {
  try {
    const auth = getAuth(req);
    if (!auth || !auth.userId || auth.userId !== userId) {
      console.warn(`Unauthorized access attempt by user: ${auth?.userId}`);
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [isUserOnGroup, group] = await Promise.all([
      prisma.groupMember.findFirst({ where: { groupId, userId } }),
      prisma.group.findUnique({
        where: { id: groupId },
        include: { members: { include: { user: true } }, creator: true },
      }),
    ]);

    if (!isUserOnGroup) {
      return NextResponse.json(
        { message: "You dont have access within this group" },
        { status: 401 }
      );
    }
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    await prisma.groupMember.deleteMany({ where: { groupId } });
    await prisma.group.delete({ where: { id: groupId } });

    return NextResponse.json({ message: "Group deleted" }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "", error: (error as Error).message },
      { status: 500 }
    );
  }
}
