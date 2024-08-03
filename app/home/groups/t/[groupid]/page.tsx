"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Calendar, MenuIcon } from "lucide-react";
import CalendarUI from "@/app/_components/CalendarUI";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileCards from "./_components/ProfileCards";
import MemberCards from "./_components/MemberCards";

const Page = () => {
  const params = useParams();
  const paramsID = params.groupid;
  const { user } = useUser();

  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if (!user?.id || !paramsID) {
          throw new Error("Missing user ID or group ID");
        }
        const url = `/api/group/${user?.id}/t/${paramsID}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch group");
        }
        const data = await response.json();
        setResponse(data);
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };
    if (user?.id && params) {
      fetchGroup();
    }
  }, [params, user?.id]);

  const groupId = response?.group.id;
  
  const clientUser = response?.group.members.filter((member : {user: {id: string}}) => {
    return member.user.id === user?.id;
  });
  const isUserRO = clientUser && clientUser[0].role === "MEMBER" ? true : false;

  return (
    <div>
      <div className="w-full p-3 flex justify-between items-center ">
        <h1>{response?.group.name} </h1>
      </div>
      <CalendarUI groupId={groupId} isRO={isUserRO} />
      <br />
      <br />
      <br />
      <div className=" border p-10">
        {response ? (
          <div className=" grid grid-cols-3 gap-4">
            <div className="border rounded-md md:col-span-2 col-span-3 min-h-36 p-5">
              <h1 className="text-4xl font-semibold">{response.group.name}</h1>
              <p className="text-lg">{response.group.description}</p>
              <p className="text-sm">
                Members: {response.group.members.length}
              </p>
              <p className="text-sm">Group Id: {response.group.id}</p>
            </div>
            <div className="col-span-3 md:col-span-1 min-h-36">
              <ProfileCards
                imageUrl={response.group.creator.imageUrl}
                name={response.group.creator.name}
                role={"CREATOR"}
              />
            </div>
            <div className="border rounded-md col-span-3 min-h-36 p-5">
              <h1 className="text-lg">Admins</h1>
            </div>
            <div className="border rounded-md col-span-3 min-h-36 p-5">
              <h1 className="text-lg mb-2">Members</h1>
              <div className="grid grid-cols-5 gap-3">
                {response.group.members.map((member: any) => (
                <MemberCards
                imageUrl={member.user.imageUrl}
                name={member.user.name}
                role={member.role}
                key={member.user.id}
                />
              ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Page;
