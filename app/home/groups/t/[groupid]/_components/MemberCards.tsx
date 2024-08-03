import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";
import { EllipsisVertical } from "lucide-react";

type MemberCardsProps = {
  imageUrl: string;
  name: string;
  role: string;
};
const MemberCards: React.FC<MemberCardsProps> = ({ imageUrl, name, role }) => {
  return (
    <div className="border flex flex-col justify-center items-center rounded shadow-lg py-10 relative ">
      <button className="absolute top-0 right-0 m-2 hover:bg-muted rounded p-1">
        <EllipsisVertical />
      </button>
      <Avatar>
        <AvatarImage src={imageUrl} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="text-xl font-bold">{name}</p>
      <p>{role}</p>
    </div>
  );
};

export default MemberCards;
