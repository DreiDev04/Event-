import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import ButtonAuth from "./_components/ButtonAuth";

const icons = [
  {
    icon: "https://cdn-icons-png.flaticon.com/128/17389/17389629.png",
    name: "Real-Time Collaboration",
    description:
      "Work together with your group in real-time to ensure everyone is on the same page.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/3790/3790039.png",
    name: "Role-Based Access",
    description:
      "Assign roles and permissions to manage your events effectively.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/2139/2139551.png",
    name: "Seamless Event Management",
    description:
      "Keep track of everything with intuitive event management tools.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen ">
      <nav className="w-full py-4 flex justify-between items-center px-8 bg-card">
        <div className="text-xl font-bold text-card-foreground">Event++</div>
        <div className="space-x-4">
          <ButtonAuth />
        </div>
      </nav>

      <header className="flex-grow flex flex-col justify-center items-center text-center p-8 mb-10">
        <br />
        <br />
        <h1 className="text-5xl font-bold mb-4">
          One Tool for Managing All Your Events
        </h1>
        <p className="text-lg mb-8 max-w-2xl">
          Event++ enables you to effortlessly organize and manage your college
          events with role-based access control, ensuring everyone stays on
          track.
        </p>
        <br />
        <Image
          src={"/samples/preview.png"}
          width={800}
          height={800}
          alt="Demo Image"
        />
        <br />
        <div className="flex space-x-4">
          <Button asChild>
            <Link href={"/home"} className="text-lg font-semibold">
              Get Started
            </Link>
          </Button>
        </div>
      </header>

      <section className="bg-accent py-10 px-8 flex flex-col">
        <div className="flex  justify-center mb-10">
          <h1 className="text-5xl font-bold">Features</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {icons.map((icon) => (
            <div key={icon.name} className="flex flex-col items-center">
              <div>
                <Image src={icon.icon} alt={icon.name} width={64} height={64} />
              </div>
              <h2 className="text-xl font-bold mt-4">{icon.name}</h2>
              <p className="text-center">{icon.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-card text-card-foreground text-center py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Join us today and never miss an event again.
          </p>
          <Button variant={"secondary"}>
            <Link href={"/sign-up"} className="font-semibold text-lg">
              Sign Up Now
            </Link>
          </Button>
          <div className="mt-12">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Event++. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
