import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prismaClient';
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest, { params }: { params: { _groupId: string } }) {
  try {
    const authUserId = getAuth(req);
    const { _groupId } = params;

    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // const event = await prisma.groupEvent.findMany({
    //   where:{
    //     groupId: _groupId
    //   }
    // });
    const event = await prisma.groupEvent.findMany({
      where: {
        groupId: _groupId
      },
      
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });

  } catch (error) {
    console.error("Error fetching group:", error);
    return NextResponse.json({ message: "Failed to fetch group", error: error as Error }, { status: 500 });
  }
}
