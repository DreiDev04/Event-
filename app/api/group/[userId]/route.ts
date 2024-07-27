import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const authUserId = getAuth(req);
    const { userId } = params;

    console.log("Params:", userId);
    console.log("User ID:", userId);

    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (authUserId.userId !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userGroups = await prisma.group.findMany({
      where: {
        creatorId: authUserId.userId,
      },
    });

    if (!userGroups) {
      return NextResponse.json({ message: "No Groups found" }, { status: 404 });
    }

    return NextResponse.json({ userGroups });
  } catch (error) {
    console.error("Error fetching user's group:", error);
    return NextResponse.json(
      { message: "Failed to fetch user's group", error: error as Error },
      { status: 500 }
    );
  }
}
