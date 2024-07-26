// app/api/test-api/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prismaClient';

export async function GET() {
  try {
    console.log('Querying users...');
    // const users = await prisma.$queryRaw`SELECT * FROM "User"`;
    const users = await prisma.user.findMany();

    console.log(users); 


    return NextResponse.json({ message: 'Database connected successfully', users });
  } catch (error) {
    console.error('Error fetching users:', error); // Log any errors
    return NextResponse.json({ message: 'Failed to connect to the database', error: error as Error }, { status: 500 });
  }
}
