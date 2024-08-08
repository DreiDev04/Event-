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
    const { groupId } = params;

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

    const currentUserRole = await prisma.groupMember.findFirst({
      where: { groupId: groupId, userId: auth.userId },
    });

    if (currentUserRole?.role !== "ADMIN" && currentUserRole?.role !== "CREATOR") {
      return NextResponse.json(
        { message: "You do not have permission to remove this user" },
        { status: 403 }
      );
    }

    if (user.role === "CREATOR") {
      return NextResponse.json(
        { message: "You cannot remove the creator of the group" },
        { status: 403 }
      );
    }

    await prisma.groupMember.delete({
      where: { id: user.id },
    });

    return NextResponse.json({ message: "User removed from group" });
  } catch (error) {
    console.error("Error removing user from group:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred", error: (error as Error).message },
      { status: 500 }
    );
  }
}

