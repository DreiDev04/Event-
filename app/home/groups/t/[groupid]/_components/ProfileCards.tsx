import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

type ProfileCardsProps = {
  imageUrl: string;
  name: string;
  role: string;
};
const ProfileCards: React.FC<ProfileCardsProps> = ({
  imageUrl,
  name,
  role,
}) => {
  return (
    <div className="border flex flex-col justify-center items-center rounded shadow-lg py-10 ">
      <Image
        src={imageUrl}
        alt="profile"
        width={100}
        height={100}
        className="rounded-full border"
      />
      <p className="text-xl font-bold">{name}</p>
      <p>{role}</p>
    </div>
  );
};

export default ProfileCards;
