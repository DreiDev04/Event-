"use client"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type DialogContentTemplateProps = {
  handleOpenDialog: (content: string) => void;
  content: string;
  onConfirm: () => void;
};

export function DialogContentTemplate({
  handleOpenDialog,
  content,
  onConfirm,
}: DialogContentTemplateProps) {
  const [loading, setLoading] = useState<boolean>(false)

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent aria-description="manage-user">
      <DialogHeader>
        {content === "admin" ? (
          <>
            <DialogTitle>Make Admin</DialogTitle>
            <DialogDescription>
              Do you really want to make this user an admin? This action cannot be undone.
            </DialogDescription>
          </>
        ) : content === "remove" ? (
          <>
            <DialogTitle>Remove User</DialogTitle>
            <DialogDescription>
              Do you really want to remove this user from the group? This action cannot be undone.
            </DialogDescription>
          </>
        ) : content === "member" ? (
          (
            <>
            <DialogTitle>Make Member</DialogTitle>
            <DialogDescription>
              Do you really want to make this user a member? This action cannot be undone.
            </DialogDescription>
          </>
          )
        ): null
        }
      </DialogHeader>
      <DialogFooter>
        <Button type="reset" variant={"outline"} onClick={() => handleOpenDialog("")}>
          Cancel
        </Button>
        <Button type="submit" onClick={handleConfirm} disabled={loading}>
          {loading ? "Loading..." : "Confirm"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default DialogContentTemplate;
