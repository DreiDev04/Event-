import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismaClient";
import { getAuth } from "@clerk/nextjs/server";
import { GroupEvent } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; groupId: string } }
) {
  try {
    const authUserId = getAuth(req);
    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { userId, groupId } = params;
    //TODO: Check if user is in group and is admin or creator

    if (userId !== authUserId.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // console.log("fetching events for group: ", groupId);
    const fetchedEvent = await prisma.groupEvent.findMany({
      where: {
        groupId: groupId,
        group: {
          members: {
            some: {
              userId: userId,
              role: {
                in: ['CREATOR', 'ADMIN', 'MEMBER']
              }
            }
          }
        }
      },
      include: {
        group: {
          include: {
            members: true
          }
        }
      }
    });

    if (!fetchedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    // console.log("fetch: ",fetchedEvent);
    return NextResponse.json({ fetchedEvent });
  } catch (error) {
    console.error("Error fetching group:", error);
    return NextResponse.json(
      { message: "Failed to fetch group", error: error as Error },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string; groupId: string } }
) {
  try {
    //* should add var who created????
    const authUserId = getAuth(req);
    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    //TODO: Check if user is in group and is admin or creator
    const { userId, groupId } = params;

    if (userId !== authUserId.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const events: GroupEvent[] = await req.json();

    const createdEvents = await Promise.all(
      events.map(async (event) => {
        const { EndTime, IsAllDay, StartTime, Subject, Location } = event;

        return prisma.groupEvent.create({
          data: {
            Subject,
            StartTime,
            EndTime,
            IsAllDay,
            Location,
            // CreatedBy: authUserId, // Assuming you have a CreatedBy field in your GroupEvent model
            groupId,
          },
        });
      })
    );

    return NextResponse.json({ createdEvents });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Failed to create event", error: error as Error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string; groupId: string } }
) {
  try {
    //* should add var who created????
    const authUserId = getAuth(req);
    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    //TODO: Check if user is in group and is admin or creator
    const { userId, groupId } = params;

    if (userId !== authUserId.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const events: GroupEvent[] = await req.json();

    const updatedEvents = await Promise.all(
      events.map(async (event) => {
        const { Id, EndTime, IsAllDay, StartTime, Subject, Location } = event;

        return prisma.groupEvent.update({
          where: { Id },
          data: {
            Subject,
            StartTime,
            EndTime,
            IsAllDay,
            Location,
          },
        });
      })
    );

    return NextResponse.json({ updatedEvents });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Failed to create event", error: error as Error },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string; groupId: string } }
) {
  try {
    //* should add var who created????
    const authUserId = getAuth(req);
    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    //TODO: Check if user is in group and is admin or creator
    const { userId, groupId } = params;

    if (userId !== authUserId.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const eventId: string = await req.json();

    const deletedEvent = await prisma.groupEvent.delete({
      where: { Id: eventId },
    });

    return NextResponse.json({ deletedEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Failed to create event", error: error as Error },
      { status: 500 }
    );
  }
}
