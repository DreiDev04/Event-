"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import CalendarUI from "@/app/_components/CalendarUI";
import { Button } from "@/components/ui/button";
import ProfileCards from "./_components/ProfileCards";
import MemberCards from "./_components/MemberCards";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/components/store/store";

const Page = () => {
  const params = useParams();
  const paramsID = params.groupid;
  const { user } = useUser();
  const router = useRouter();
  const { group, setGroup } = useStore();
  const { toast } = useToast();

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
        setGroup(data.filteredGroup);
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };
    if (user?.id && params) {
      fetchGroup();
    }
  }, [params]);

  console.log("Group: ", group);
  const groupId = group?.id;
  const clientUser = group?.member?.filter(
    (member: { user: { id: string } }) => {
      return member.user.id === user?.id;
    }
  );
  const isUserRO =
    clientUser && clientUser[0]?.role === "MEMBER" ? true : false;
  const currentRole = clientUser && clientUser[0]?.role;

  const leaveGroup = async () => {
    try {
      if (!user?.id || !groupId) {
        throw new Error("Missing user ID or group ID");
      }
      const url = `/api/group/${user?.id}/t/${groupId}/leave`;
      const response = await fetch(url, { method: "POST" });
      if (!response.ok) {
        throw Error("Failed to leave group");
      }
      const data = await response.json();
      router.push("/home");
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };
  const deleteGroup = async () => {
    try {
      if (!user?.id || !groupId) {
        throw new Error("Missing user ID or group ID");
      }
      const url = `/api/group/${user?.id}/t/${groupId}/delete`;
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) {
        throw Error("Failed to delete group");
      }
      const data = await response.json();
      router.push("/home");
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  // console.log(group);

  return (
    <div>
      <div className="w-full p-3 flex justify-between items-center ">
        <h1 className="font-bold text-lg">{group?.name} </h1>
      </div>
      <CalendarUI groupId={groupId} isRO={isUserRO} />
      <br />
      <br />
      <br />
      <div className=" border p-10">
        {group ? (
          <div className=" grid grid-cols-3 gap-4">
            <div className="border rounded-md md:col-span-2 col-span-3 min-h-36 p-5 gap-2 flex flex-col">
              <h1 className="text-4xl font-semibold">{group.name}</h1>
              <p className="text-lg">{group.description}</p>
              <p className="text-sm">Members: {group.member?.length}</p>
              <p className="text-sm">Group Id: {group.id}</p>
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Share</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share link</DialogTitle>
                      <DialogDescription>
                        Anyone who has this link will be able to join this
                        group.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input
                          id="link"
                          defaultValue={"http://localhost:3000/home/joincreate/join/" + group.id}
                          readOnly
                        />
                      </div>
                      <Button type="submit" size="sm" className="px-3" onClick={()=>{
                        navigator.clipboard.writeText("http://localhost:3000/home/joincreate/join/" + group.id)
                        toast({
                          title: "Copied to clipboard",
                          description: "You can now share the link with others.",
                        })
                      }}>
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {currentRole === "CREATOR" ? (
                  <>
                    {/* <Button
                      onClick={() => {
                        setOpenDialogDelete((prev) => !prev);
                      }}
                      variant={"destructive"}
                    >
                      <span>Delete Group</span>
                    </Button> */}
                    <Dialog
                      // open={openDialogDelete}
                      // onOpenChange={setOpenDialogDelete}
                    >
                      <DialogTrigger asChild>
                    <Button variant="destructive" >Delete Group</Button>
                  </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Group</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to leave this group?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                          </DialogClose>
                          <Button onClick={deleteGroup}>Delete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <>
                    {/* <Button
                      onClick={() => {
                        setOpenDialogLeave((prev) => !prev);
                      }}
                      variant={"destructive"}
                    >
                      <span>Leave Group</span>
                    </Button> */}
                    <Dialog
                      // open={openDialogLeave}
                      // onOpenChange={setOpenDialogLeave}
                    >
                       <DialogTrigger asChild>
                    <Button variant="destructive" >Leave Group</Button>
                  </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Leave Group</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to leave this group?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                          </DialogClose>
                          {/* <Button
                            onClick={() => {
                              setOpenDialogLeave((prev) => !prev);
                            }}
                            variant={"outline"}
                          >
                            Cancel
                          </Button> */}
                          <Button onClick={leaveGroup}>Leave</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>
            </div>
            <div className="col-span-3 md:col-span-1 min-h-36">
              <ProfileCards
                imageUrl={group.creator?.imageUrl}
                name={group.creator?.name}
                role={"CREATOR"}
              />
            </div>

            <div className="border rounded-md col-span-3 min-h-36 p-5">
              <h1 className="text-lg">Admins</h1>
              <div className="grid grid-cols-5 gap-3">
                {group.member?.some(
                  (member: any) => member.role === "ADMIN"
                ) ? (
                  group.member?.map((member: any) =>
                    member.role === "ADMIN" ? (
                      <MemberCards
                        groupId={groupId}
                        id={member?.user.id}
                        imageUrl={member?.user.imageUrl}
                        name={member?.user.name}
                        role={member?.role}
                        key={member?.user.id}
                        // onUpdateRole={updateMemberRole}
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
                {group.member?.some(
                  (member: any) => member.role === "MEMBER"
                ) ? (
                  group.member?.map((member: any) =>
                    member.role === "MEMBER" ? (
                      <MemberCards
                        groupId={groupId}
                        id={member?.user.id}
                        imageUrl={member?.user.imageUrl}
                        name={member?.user.name}
                        role={member?.role}
                        key={member?.user.id}
                        // onUpdateRole={updateMemberRole}
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
