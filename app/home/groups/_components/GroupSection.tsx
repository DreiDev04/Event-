import { Group } from "@prisma/client";
import React from "react";
import Link from "next/link";

type GroupSectionProps = {
  groups: Group[];
};

const GroupSection = ({ groups }: GroupSectionProps) => {
  // console.log("Groups:", groups);

  return (
    <div className="flex flex-col">
      {groups.length > 0 ? (
          groups.map((group) => (
            <Link
              key={group.id}
              className="p-3 hover:bg-muted rounded-sm"
              href={`/home/groups/t/${group.id}`}
            >
              <h1 className="font-bold">{group.name}</h1>
              <p className="text-sm line-clamp-1">
                {group.description || "No description available"}
              </p>
            </Link>
          ))
        ) : (
          <div className="p-3">No groups available</div>
        )}
    </div>
  );
};

export default GroupSection;