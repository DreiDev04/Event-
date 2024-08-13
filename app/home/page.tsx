"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import BetaTest from "../_components/BetaTest";

import Image from "next/image";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GetingStarted from "../_components/contents/GetingStarted";

const HomePage = () => {
  const { user } = useUser();
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="flex flex-col gap-2 justify-center">
      <div className="w-full h-full py-20">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Get started with Event++
        </h2>
        <Carousel items={cards} />
      </div>
      <div>
        <h1 className="text-4xl font-bold">
          Welcome <br />
          {user?.fullName}
        </h1>
        <p className="text-lg mt-4">
          Manage all your events effortlessly in one place.
        </p>
        <div className="flex my-5 gap-2">
          <Button variant={"outline"} asChild>
            <Link href="/home/groups">Go to Groups</Link>
          </Button>
          <Button variant={"secondary"} asChild>
            <Link href="/home/joincreate">Go to Join or Create Group</Link>
          </Button>
        </div>
        <br />
        <BetaTest />
      </div>
    </div>
  );
};

const DummyContent = () => {
  return (
    <>
      <div className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700">Meow tiktok sad song</span> meow meow
          meow meow meow meow meow meow meow meow meow meow meow meow meow meow
          meow meow meow meow meow meow meow meow meow meow meow meow
        </p>
        <Image
          src="/samples/cat-image.jpg"
          alt="Macbook mockup from Aceternity UI"
          height="500"
          width="500"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain py-10"
        />
      </div>
    </>
  );
};

const data = [
  {
    category: "Event++",
    title: "Getting started.",
    src: "/carousel/outer/geting-started.jpg",
    content: <GetingStarted />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "/carousel/outer/enhance-your-productivity.jpeg",
    content: <DummyContent />,
  },
  {
    category: "Grouped Events",
    title: "Working as a group",
    src: "/carousel/outer/working-as-a-group.jpg",
    content: <DummyContent />,
  },

  {
    category: "Role Based Access",
    title: "Control who manage events.",
    src: "/carousel/outer/control-manage-event.jpeg",
    content: <DummyContent />,
  },
];
export default HomePage;
