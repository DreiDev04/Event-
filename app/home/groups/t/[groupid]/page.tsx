"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Calendar, MenuIcon } from "lucide-react";
import CalendarUI from "@/app/_components/CalendarUI";
import { Button } from "@/components/ui/button";

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
  // console.log(response?.group.members);
  // const isUserMember = response?.group.members.map((member: any) => member.id).includes(user?.id);
  const isUserMember = response?.group.members.some((member: any) => {
    if (member.role === "CREATOR" || member.role === "ADMIN") {
      return true;
    } else if (member.role === "MEMBER") {
      return false;
    } else {
      return false;
    }
    // (member.role === "CREATOR" || member.role === "ADMIN") || member.role === "MEMBER"
  });

  // console.log("member  is: ", isUserMember);
  return (
    <div>
      <div className="w-full p-3 flex justify-between items-center ">
        <h1>{response?.group.name} </h1>
      </div>
      <CalendarUI groupId={groupId} isRO={isUserMember} />
      {/* <div>
        {response ? (
          <div>
            <h1>{response.group.name}</h1>
            <p>{response.group.description}</p>
            <p>Members: {response.group.members.length}</p>

            <h2>Members</h2>
            <ul>
              {response.group.members.map((member: any) => (
                <li key={member.id}>{member.id}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div> */}
    </div>
  );
};

export default Page;
