import { Role } from "@prisma/client";
import { create } from "zustand";

interface filteredGroupResponse {
  creator: {
    id: string;
    name: string | null;
    imageUrl: string | null;
  };
  description: string;
  id: string;
  member: {
    role: "ADMIN" | "MEMBER" | "CREATOR";
    user: {
      id: string;
      name: string | null;
      imageUrl: string | null;
    };
  }[];
  name: string;
}

type Store = {
  group: filteredGroupResponse;
  setGroup: (data: filteredGroupResponse) => void;
  updateMemberRole: (userId: string, newRole: "ADMIN" | "MEMBER" | "CREATOR") => void;
};

export const useStore = create<Store>()((set) => ({
  group: {
    creator: {
      id: "",
      name: "",
      imageUrl: "",
    },
    description: "",
    id: "",
    member: [],
    name: "",
  },
  setGroup: (data) => set({ group: data }),
  updateMemberRole: (userId, newRole) => {
    set((prevResponse) => {
      const updatedMembers = prevResponse.group.member.map((member) => {
        if (member.user.id === userId) {
          return { ...member, role: newRole };
        }
        return member;
      });
      return {
        ...prevResponse,
        group: { ...prevResponse.group, member: updatedMembers },
      };
    });
  },
}));

