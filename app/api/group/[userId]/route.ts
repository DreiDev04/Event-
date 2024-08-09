import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const auth = getAuth(req);

    if (!auth || !auth.userId || auth.userId !== userId) {
      console.warn(`Unauthorized access attempt by user: ${auth?.userId}`);
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userGroups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });

    const filteredGroups = userGroups.map((group) => ({
      description: group.description,
      id: group.id,
      name: group.name,
    }));

    return NextResponse.json(
      { message: "User's group found", data: filteredGroups },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user's group:", error);
    return NextResponse.json(
      { message: "Failed to fetch user's group", error: (error as Error).message },
      { status: 500 }
    );
  }
}