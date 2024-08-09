import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";
import { group } from "console";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuth(req);
    if (!auth || !auth.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { group_name, desc } = await req.json();

    // Input validation
    if (
      !group_name ||
      typeof group_name !== "string" ||
      !desc ||
      typeof desc !== "string"
    ) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const newGroup = await prisma.group.create({
      data: {
        name: group_name,
        description: desc,
        creatorId: auth.userId,
        members: {
          create: {
            userId: auth.userId,
            role: "CREATOR",
          },
        },
      },
    });
    const groupId = newGroup.id;

    return NextResponse.json(
      {
        message: "Group created successfully",
        groupId: groupId
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { message: "Failed to create group", error: (error as Error).message },
      { status: 500 }
    );
  }
}
