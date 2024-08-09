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
}));

// function Counter() {
//   const { count, inc } = useStore()
//   return (
//     <div>
//       <span>{count}</span>
//       <button onClick={inc}>one up</button>
//     </div>
//   )
// }
