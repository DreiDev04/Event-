"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const JoinInput = () => {
  const router = useRouter();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("code") as HTMLInputElement;
    const value = (input.value).trim();
    // console.log(value);
    router.push(`/home/joincreate/join/${value}`);

  };

  return (
    <form onSubmit={onSubmit} className="flex gap-4">
      <Input
        type="text"
        name="code"
        autoComplete="off"
        required
        placeholder="enter code"
      />
      <Button type="submit">Join</Button>
    </form>
  );
};

export default JoinInput;
