"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loaders from "@/components/loaders/Loaders";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'


interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
}

interface GroupResponse {
  message: string;
  filteredGroup: Group;
}

const Page = () => {
  const { groupId } = useParams();
  const [groupInfo, setGroupInfo] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await fetch(`/api/join-group/${groupId}`);
        if (!res.ok) {
          throw new Error("Group not found");
        }
        const data: GroupResponse = await res.json();
        setGroupInfo(data.filteredGroup);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  if (loading) {
    return (
      <div className="h-screen">
        <Loaders />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-full grid place-items-center relative">
      <Button className="absolute top-2 left-2" asChild>
        <Link href="/home/joincreate">
          <ArrowLeft />
          Back
        </Link>
      </Button>
      <InviteComponent group={groupInfo} groupId={groupId} />
    </div>
  );
};

type InviteProps = {
  group: Group | null;
  groupId: string | string[];
};

const InviteComponent: React.FC<InviteProps> = ({ group, groupId }) => {
  const router = useRouter()


  const joinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/join-group/${groupId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to join group");
      }
      router.push(`/home/groups/t/${groupId}`)

    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="min-w-80 border py-10 px-5 rounded-md flex flex-col gap-2 justify-center items-center shadow-lg bg-card">
      <h1 className="text-3xl font-bold">{group?.name}</h1>
      <p>{group?.description}</p>
      <p className="text-sm underline">Members: {group?.members}</p>
      <form onSubmit={joinGroup}>
        <Button className="mt-5" type="submit">
          Join Group
        </Button>
      </form>
    </div>
  );
};

export default Page;
