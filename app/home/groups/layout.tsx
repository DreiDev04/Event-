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

const GroupLayout = ({ children }: { children?: React.ReactNode }) => {
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
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
    <div className="border min-h-screen flex">
      <div className="w-1/5 border flex flex-col">
        <div className="border-b-2">
          <h1 className="font-bold text-lg px-4 py-2">Groups</h1>
          <div className="px-2 py-1">
            <Input />
          </div>
        </div>
        <GroupSection groups={userGroups} />
      </div>
      <div className="w-4/5">{children}</div>
    </div>
  );
};

export default GroupLayout;
