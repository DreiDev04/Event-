"use client";
import React from "react";
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

export const formSchemaCreteGroup = z.object({
  group_name: z.string().min(3, {
    message: "Group name must be at least 3 characters.",
  }),
  desc: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

const CreateGroup = () => {
  const form = useForm<z.infer<typeof formSchemaCreteGroup>>({
    resolver: zodResolver(formSchemaCreteGroup),
    defaultValues: {
      group_name: "",
      desc: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchemaCreteGroup>) {
    try {
      const response = await fetch("/api/create-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Values:",values);
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
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateGroup;
