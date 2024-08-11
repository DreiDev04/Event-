"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchemaCreteGroup = z.object({
  group_name: z.string().min(3, {
    message: "Group name must be at least 3 characters.",
  }),
  desc: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

const CreateGroup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchemaCreteGroup>>({
    resolver: zodResolver(formSchemaCreteGroup),
    defaultValues: {
      group_name: "Untitled Group",
      desc: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaCreteGroup>) {
    setLoading(true);
    try {
      const response = await fetch("/api/create-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: data.message || "An unexpected error occurred.",
        });
        throw new Error(data.message);
      }
      router.push(`/home/groups/t/${data.groupId}`);
    } catch (error: any) {
      console.error("Failed to create group:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="group_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>Submit</Button>
      </form>
    </Form>
  );
};

export default CreateGroup;