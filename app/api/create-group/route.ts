import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { group_name, desc } = await req.json();
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const newGroup = await prisma.group.create({
      data: {
        name: group_name,
        description: desc,
        creatorId: userId,
        members: {
          create: {
            userId: userId,
            role: 'CREATOR',
          },
        },
      },
    });

    return NextResponse.json({
      message: "Group created successfully",
      group: newGroup,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { message: "Failed to create group", error: error as Error },
      { status: 500 }
    );
  }
}
