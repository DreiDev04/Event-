"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Calendar } from "lucide-react";
import CalendarUI from "@/app/_components/CalendarUI";

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

  return (
    <div>
      <CalendarUI groupId={groupId}/>
      <div>
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
      </div>
    </div>
  );
};

export default Page;
