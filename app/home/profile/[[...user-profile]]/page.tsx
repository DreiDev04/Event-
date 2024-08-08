"use client";

import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <UserProfile path="/home/profile" />
      </div>
    </div>
  );
}