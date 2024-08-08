import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const { userId } = getAuth(req);
    const { groupId } = params;

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const isUserOnGroup = await prisma.groupMember.findFirst({
      where: {
        groupId,
        userId,
      },
    });
    if (!isUserOnGroup) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: {
          include: {
            user: true, 
          },
        }, 
        creator: true, 
      },
    });
    if (!group) {
      return NextResponse.json({ message: 'Group not found' }, { status: 404 });
    }

    return NextResponse.json({ group });
  } catch (error) {
    console.error('Error fetching group:', error);
    return NextResponse.json({ message: 'Failed to fetch group', error: error as Error }, { status: 500 });
  }
}
