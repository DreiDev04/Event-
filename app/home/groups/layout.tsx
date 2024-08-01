"use client";
import CalendarUI from "@/app/_components/CalendarUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Group } from "@prisma/client";
import GroupSection from "./_components/GroupSection";
import Loader from "@/components/loaders/Loaders";

const GroupLayout = ({ children }: { children?: React.ReactNode }) => {
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const { user } = useUser();

  if (!user) {
    return <Loader />;
  }

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`/api/group/${user?.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data = await response.json();
        if (Array.isArray(data.userGroups)) {
          setUserGroups(data.userGroups);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroup();
  }, [user?.id]);

  return (
    <>
      <div className="md:min-h-screen flex flex-col-reverse md:flex-row gap-4">
        <div className="md:w-4/5 border rounded-lg min-h-screen ">
          {children}
        </div>
        <div className="md:w-1/5 border flex flex-col rounded-md min-h-[40rem] md:min-h-full">
          <div className="border-b-2">
            <h1 className="font-bold text-lg px-4 py-2">Groups</h1>
            <div className="px-2 py-1">
              <Input />
            </div>
          </div>
          <GroupSection groups={userGroups} />
        </div>
      </div>
      {/* <div className="h-screen">
        
      </div> */}
    </>
  );
};

export default GroupLayout;
