import { DialogContentTemplate } from "./DialogContentTemplate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import { revalidatePath } from "next/cache";

type MemberCardsProps = {
  imageUrl: string;
  name: string;
  role: string;
  id: string;
  groupId: string;
  onUpdateRole: (userId: string, newRole: string) => void;
  currentRole?: "ADMIN" | "MEMBER" | "CREATOR";
};

const MemberCards: React.FC<MemberCardsProps> = ({
  imageUrl,
  name,
  role,
  id,
  groupId,
  onUpdateRole,
  currentRole,
}) => {
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    content: string;
    id: string | null;
  }>({ open: false, content: "", id: null });

  const handleOpenDialog = (content: string, id: string) => {
    setDialogState({ open: true, content, id });
  };

  const handleCloseDialog = () => {
    setDialogState({ open: false, content: "", id: null });
  };
  // console.log(groupId)

  const makeAdmin = async () => {
    if (!dialogState.id) {
      throw new Error("Missing user ID");
    }
    try {
      const url = `/api/manage-group/${groupId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "ADMIN", id: dialogState.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to make user an admin");
      }
      const data = await response.json();
      console.log("User is now an admin:", data);
      onUpdateRole(dialogState.id!, "ADMIN");
    } catch (error) {
      console.error("Error making user an admin:", error);
    }

    handleCloseDialog();
  };

  const demoteAdmin = async () => {
    if (!dialogState.id) {
      throw new Error("Missing user ID");
    }
    try {
      const url = `/api/manage-group/${groupId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "MEMBER", id: dialogState.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to demote user from admin");
      }
      const data = await response.json();
      console.log("User is now a member:", data);
      onUpdateRole(dialogState.id!, "MEMBER");
    } catch (error) {
      console.error("Error demoting user from admin:", error);
    }

    handleCloseDialog();
  };

  const removeUser = async () => {
    if (!dialogState.id) {
      throw new Error("Missing user ID");
    }
    try {
      const url = `/api/group/${groupId}/remove-user`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: dialogState.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove user from group");
      }
      const data = await response.json();
      console.log("User removed from group:", data);
    } catch (error) {
      console.error("Error removing user from group:", error);
    }
    handleCloseDialog();
  };

  const getConfirmHandler = () => {
    if (dialogState.content === "admin") return makeAdmin;
    if (dialogState.content === "remove") return removeUser;
    if (dialogState.content === "member") return demoteAdmin;
    return () => {};
  };

  return (
    <div className="border flex flex-col justify-center items-center rounded shadow-lg relative py-10">
      {currentRole === "ADMIN" || currentRole === "CREATOR" ? (
        <Dialog open={dialogState.open} onOpenChange={handleCloseDialog}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:bg-muted rounded absolute top-0 right-0 mt-2 mr-2">
                <EllipsisVertical />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Manage User</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {role === "MEMBER" ? (
                <DropdownMenuItem onClick={() => handleOpenDialog("admin", id)}>
                  Make Admin
                </DropdownMenuItem>
              ) : role === "ADMIN" ? (
                <DropdownMenuItem
                  onClick={() => handleOpenDialog("member", id)}
                >
                  Make Member
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem onClick={() => handleOpenDialog("remove", id)}>
                Remove from Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContentTemplate
            handleOpenDialog={handleCloseDialog}
            content={dialogState.content}
            onConfirm={getConfirmHandler()}
          />
        </Dialog>
      ) : null}

      <Avatar>
        <AvatarImage src={imageUrl} alt="avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <p className="text-xl font-bold">{name}</p>
      <p>{role}</p>
    </div>
  );
};

export default MemberCards;
