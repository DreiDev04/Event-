import { Button } from "@/components/ui/button";
import CalendarUI from "./_components/CalendarUI";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex flex-col">
      <h1 className="mb-30">Welcome to Campus Calendar</h1>
      <Button asChild>
        <Link href={"/home"}> Get Started</Link>
      </Button>
    </div>
  );
}
