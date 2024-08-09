import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";


export async function GET(
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

    const filteredGroup = {
      creator: { id: group.creator.id, name: group.creator.name, imageUrl: group.creator.imageUrl },
      description: group.description,
      id: group.id,
      member: [
        {
          role: group.members[0].role,
          user: {
            id: group.members[0].user.id,
            name: group.members[0].user.name,
            imageUrl: group.members[0].user.imageUrl,
          },
        },
      ],
      
      name: group.name,
    };
    
  

    return NextResponse.json(
      { message: "Group found", filteredGroup },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching group:", error);
    return NextResponse.json(
      { message: "Failed to fetch group", error: error as Error },
      { status: 500 }
    );
  }
}

