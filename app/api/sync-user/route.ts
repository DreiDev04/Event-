import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new NextResponse("User not exist", { status: 404 });
  }

  try {
    // Check if the user already exists in your database
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id }, // Clerk user ID
    });

    if (!existingUser) {
      // Create a new user record in your database
      await prisma.user.create({
        data: {
          id: user.id, // Clerk user ID
          email: user.emailAddresses[0].emailAddress || "",
          name: user.fullName || "",
        },
      });
    } else {
      // Optionally, update existing user record
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: user.emailAddresses[0].emailAddress || "",
          name: user.firstName || "",
        },
      });
    }

    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/home", // Redirect to the home page
      },
    });
  } catch (error) {
    console.error("Error synchronizing user:", error);
    return NextResponse.json(
      { message: "Failed to synchronize user", error: error as Error },
      { status: 500 }
    );
  }
}
