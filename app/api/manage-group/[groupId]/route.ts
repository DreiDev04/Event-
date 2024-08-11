import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";

export async function PUT(
  req: NextRequest,
  { params: { groupId } }: { params: { groupId: string } }
) {
  try {
    const auth = getAuth(req);

    if (!auth || !auth.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { role, id } = body;

    if (!["ADMIN", "MEMBER"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    const [group, user] = await Promise.all([
      prisma.group.findUnique({ where: { id: groupId } }),
      prisma.groupMember.findFirst({
        where: { groupId, userId: id },
      }),
    ]);
    
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.groupMember.update({
      where: { id: user.id },
      data: { role: role },
    });

    return NextResponse.json({ message: `User is now a ${role}` });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { message: `Failed to update user role: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
