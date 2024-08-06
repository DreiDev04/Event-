import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(
  req: NextRequest,
  { params: { groupId } }: { params: { groupId: string } }
) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: true,
      }
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
      { message: "Group found", filteredGroup },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "", error: (error as Error).message },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest, { params: { groupId } }: { params: { groupId: string } }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const isUserInDB = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if (!isUserInDB) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const isUserAlreadyInGroup = await prisma.groupMember.findFirst({
      where: {
        groupId: groupId,
        userId: userId
      }
    });
    if (isUserAlreadyInGroup) {
      return NextResponse.json({ message: "User already in group" }, { status: 400 });
    }

    const group = await prisma.group.findUnique({
      where: {
        id: groupId
      }
    });
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    const newMember = await prisma.groupMember.create({
      data: {
        userId: userId,
        groupId: groupId,
        role: "MEMBER"
      }
    });
    
    return NextResponse.json({ message: "User joined group", newMember }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Failed", error: (error as Error).message },
      { status: 500 }
    );
  }
}