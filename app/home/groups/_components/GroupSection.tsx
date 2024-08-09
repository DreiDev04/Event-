import { Group } from "@prisma/client";
import React from "react";
import Link from "next/link";

type GroupSectionProps = {
  groups: Group[];
};

const GroupSection = ({ groups }: GroupSectionProps) => {
  if (!groups) {
    return <div className="p-3">No groups available</div>;
  }

  return (
    <div className="flex flex-col">
      {groups.map((group: Group) => (
        <Link
          key={group.id}
          className="p-3 hover:bg-muted rounded-sm border-b"
          href={`/home/groups/t/${group.id}`}
        >
          <h1 className="font-bold">{group.name}</h1>
          <p className="text-sm line-clamp-1">
            {group.description || "No description available"}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default GroupSection;
