import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    // Fetch the user's ID from Clerk's authentication middleware
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    

    const { groupId } = params;

    // Fetch the group details
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: true, // Include members if you need them
        creator: true, // Include creator if you need it
      },
    });
    
    // Remove access to group if user is not the creator
    // if (group?.creatorId !== userId) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    if (!group) {
      return NextResponse.json({ message: 'Group not found' }, { status: 404 });
    }

    return NextResponse.json({ group });
  } catch (error) {
    console.error('Error fetching group:', error);
    return NextResponse.json({ message: 'Failed to fetch group', error: error as Error }, { status: 500 });
  }
}
