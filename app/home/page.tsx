"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { user } = useUser();

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold">Welcome {user?.fullName}</h1>
      <p className="text-lg mt-4">
        Manage all your events effortlessly in one place. 
      </p>
    </div>
  );
};

export default Page;