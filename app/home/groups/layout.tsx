"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Group } from "@prisma/client";
import GroupSection from "./_components/GroupSection";
import Loader from "@/components/loaders/Loaders";

interface GroupResponse {
  message: string;
  data: Group[];
}

const GroupLayout = ({ children }: { children?: React.ReactNode }) => {
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const { user } = useUser();
  
  if (!user) {
    throw new Error("User not found");
  }
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`/api/group/${user.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data: GroupResponse = await response.json();
        setUserGroups(data.data);
        setFilteredGroups(data.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroup();
  }, []);
  if (!user) {
    return <Loader />;
  }


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    if (search === "") {
      setFilteredGroups(userGroups);
    } else {
      const filtered = userGroups.filter((group) =>
        group.name.toLowerCase().includes(search)
      );
      setFilteredGroups(filtered);
    }
  };

  return (
    <div className="md:min-h-screen flex flex-col-reverse md:flex-row gap-4">
      <div className="md:w-4/5 border rounded-lg min-h-screen ">
        {children}
      </div>
      <div className="md:w-1/5 border flex flex-col rounded-md min-h-[40rem] md:min-h-full">
        <div className="border-b-2">
          <h1 className="font-bold text-lg px-4 py-2">Groups</h1>
          <div className="px-2 py-1">
            <Input placeholder="Search" onChange={handleSearch} />
          </div>
        </div>
        <GroupSection groups={filteredGroups} />
      </div>
    </div>
  );
};

export default GroupLayout;