
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import JoinInput from "./_components/JoinInput";


const JoinCreate = () => {
  return (
    <div className="flex flex-col gap-10 ">
      <div className="flex flex-col gap-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Join
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Enter the code provided by the group admin to join the group. You can
          also create a new group below.
        </p>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <JoinInput />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create Group
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Create a new group and invite your friends to join. You will be the
          admin of the group.
        </p>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Button asChild>
            <Link href="/home/joincreate/create">Create</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreate;
