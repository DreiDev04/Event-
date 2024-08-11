import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params: { groupId } }: { params: { groupId: string } }
) {
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: true,
      },
    });
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }
    const filteredGroup = {
      id: group.id,
      name: group.name,
      description: group.description,
      members: group.members.length,
    };

    return NextResponse.json(
      { data: filteredGroup, message: "Group found" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving group:', error); // Updated error message
    return NextResponse.json(
      { message: "An unexpected error occurred" }, // Removed error object from response
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params: { groupId } }: { params: { groupId: string } }
) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [isUserInDB, isUserAlreadyInGroup, group] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.groupMember.findFirst({
        where: { groupId: groupId, userId: userId },
      }),
      prisma.group.findUnique({ where: { id: groupId } }),
    ]);

    if (!isUserInDB) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (isUserAlreadyInGroup) {
      return NextResponse.json(
        { message: "User already in group" },
        { status: 400 }
      );
    }

    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 405 });
    }

    const newMember = await prisma.groupMember.create({
      data: {
        userId: userId,
        groupId: groupId,
        role: "MEMBER",
      },
    });

    return NextResponse.json(
      { message: "User joined group", newMember },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed", error: (error as Error).message },
      { status: 500 }
    );
  }
}
