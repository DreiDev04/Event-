"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Group, HomeIcon, LogOut, User, UserPlus } from "lucide-react";
import Loader from "@/components/loaders/Loaders";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={cn(
        " flex flex-col md:flex-row bg-background  w-full flex-1 max-w-7xl mx-auto overflow-hidden min-h-screen min-w-full",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SignOutButton />
            <SidebarLink
              link={{
                label: `${user.fullName ? user.fullName : "<no username>"}`,
                href: "/home/profile",
                icon: (
                  <Image
                    src={`${user.imageUrl ? user.imageUrl : "/icons/user.png"}`}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="w-full p-10 border overflow-auto ">{children}</div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <Image src={"/icons/calendar.png"} width={30} height={30} alt="logo" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-lg font-bold text-foreground whitespace-pre"
      >
        Event++
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link href="/">
      <Image src={"/icons/calendar.png"} width={30} height={30} alt="logo" />
    </Link>
  );
};

const links = [
  {
    label: "Home",
    href: "/home",
    icon: (
      <HomeIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Join / Create",
    href: "/home/joincreate",
    icon: (
      <UserPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Groups",
    href: "/home/groups",
    icon: (
      <Group className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Profile",
    href: "/home/profile",
    icon: (
      <User className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  // {
  //   label: "Logout",
  //   href: "#",
  //   icon: (
  //     <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
  //   ),
  // },
];
