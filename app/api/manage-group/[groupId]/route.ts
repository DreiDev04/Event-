import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export async function PUT(
  req: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const auth = getAuth(req);
    const {groupId} = params;

    if (!auth || !auth.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { role, id } = body;

    if (!["ADMIN", "MEMBER"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    const user = await prisma.groupMember.findFirst({
      where: { groupId: groupId, userId: id },
    });
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
