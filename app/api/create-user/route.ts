// app/api/create-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';


export async function POST(req: NextRequest) {

  try {
    const { name, email, password, role } = await req.json();
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });
    return NextResponse.json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create user', error: (error as Error).message }, { status: 500 });
  }
}
