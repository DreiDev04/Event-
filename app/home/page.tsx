"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import BetaTest from "../_components/BetaTest";

const HomePage = () => {
  const { user } = useUser();

  return (
    <div className="p-8 flex flex-col gap-2 justify-center items-center">
      <h1 className="text-4xl font-bold">Welcome {user?.fullName}</h1>
      <p className="text-lg mt-4">
        Manage all your events effortlessly in one place.
      </p>
      <div>
        <BetaTest />
      </div>
    </div>
  );
};

export default HomePage;
