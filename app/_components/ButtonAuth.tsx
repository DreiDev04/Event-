"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { SignOutButton, useAuth } from "@clerk/nextjs";

const ButtonAuth = () => {
  const { userId } = useAuth();

  return (
    <>
      {userId ? (
        <div className="text-white">
          <SignOutButton />
        </div>
      ) : (
        <>
          <Button asChild variant={"link"}>
            <Link href={"/sign-up"} className="text-lg font-semibold">
              Sign up
            </Link>
          </Button>
          <Button asChild>
            <Link href={"/home"} className="text-lg font-semibold">
              Get Started
            </Link>
          </Button>
        </>
      )}
    </>
  );
};

export default ButtonAuth;
