"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import CalendarUI from "@/app/_components/CalendarUI";
import { Button } from "@/components/ui/button";
import ProfileCards from "./_components/ProfileCards";
import MemberCards from "./_components/MemberCards";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Page = () => {
  const params = useParams();
  const paramsID = params.groupid;
  const { user } = useUser();

  const [response, setResponse] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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

  const clientUser = response?.group.members.filter(
    (member: { user: { id: string } }) => {
      return member.user.id === user?.id;
    }
  );
  const isUserRO = clientUser && clientUser[0].role === "MEMBER" ? true : false;

  const currentRole = clientUser && clientUser[0].role;

  const handleManageGroup = () => {
    setOpenDialog((prev) => !prev);
  };

  const updateMemberRole = (userId: string, newRole: string) => {
    setResponse((prevResponse: any) => {
      const updatedMembers = prevResponse.group.members.map((member: any) => {
        if (member.user.id === userId) {
          return { ...member, role: newRole };
        }
        return member;
      });
      return { ...prevResponse, group: { ...prevResponse.group, members: updatedMembers } };
    });
  };

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
            <div className="border rounded-md md:col-span-2 col-span-3 min-h-36 p-5 gap-2 flex flex-col">
              <h1 className="text-4xl font-semibold">{response.group.name}</h1>
              <p className="text-lg">{response.group.description}</p>
              <p className="text-sm">
                Members: {response.group.members.length}
              </p>
              <p className="text-sm">Group Id: {response.group.id}</p>
              <div className="flex gap-3">
                <Button onClick={handleManageGroup}>
                  <span>Manage Group</span>
                </Button>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogContent
                    onInteractOutside={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <DialogHeader>
                      <DialogTitle>Manage Group</DialogTitle>
                    </DialogHeader>
                    <Input />
                  </DialogContent>
                </Dialog>
              </div>
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
              <div className="grid grid-cols-5 gap-3">
                {response.group.members.some(
                  (member: any) => member.role === "ADMIN"
                ) ? (
                  response.group.members.map((member: any) =>
                    member.role === "ADMIN" ? (
                      <MemberCards
                        groupId={groupId}
                        id={member.user.id}
                        imageUrl={member.user.imageUrl}
                        name={member.user.name}
                        role={member.role}
                        key={member.user.id}
                        onUpdateRole={updateMemberRole}
                        currentRole={currentRole}
                      />
                    ) : null
                  )
                ) : (
                  <div className="flex w-full h-56 justify-center items-center col-span-5">
                    <p>No current admins</p>
                  </div>
                )}
              </div>
            </div>
            <div className="border rounded-md col-span-3 min-h-36 p-5">
              <h1 className="text-lg mb-2">Members</h1>
              <div className="grid grid-cols-5 gap-3">
                {response.group.members.some(
                  (member: any) => member.role === "MEMBER"
                ) ? (
                  response.group.members.map((member: any) =>
                    member.role === "MEMBER" ? (
                      <MemberCards
                        groupId={groupId}
                        id={member.user.id}
                        imageUrl={member.user.imageUrl}
                        name={member.user.name}
                        role={member.role}
                        key={member.user.id}
                        onUpdateRole={updateMemberRole}
                        currentRole={currentRole}
                      />
                    ) : null
                  )
                ) : (
                  <div className="flex w-full h-56 justify-center items-center col-span-5">
                    <p>No current Members</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Page;
