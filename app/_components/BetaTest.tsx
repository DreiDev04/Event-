import {
  IconBrandFacebook,
  IconBrandGmail,
  IconBrandInstagram,
} from "@tabler/icons-react";
import Link from "next/link";

const BetaTest = () => {
  return (
    <section className="relative flex flex-col w-full max-w-md bg-gray-800 rounded-lg overflow-hidden font-sans text-base sm:w-96">
      <div className="absolute inset-0 rounded-lg bg-gray-900 z-10" />
      <div className="absolute w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-sm inset-y-2 left-2 z-20 transition-transform duration-300 ease-in-out hover:translate-x-1" />
      <header className="relative z-30 ml-2 px-4 py-2 text-blue-400 text-lg font-medium transition-transform duration-300 ease-in-out hover:translate-x-1">
        Welcome Beta Testers
      </header>
      <p className="relative z-30 text-gray-400 px-4 py-2 ml-2">
        Thank you for testing out the app! Your feedback and support are
        invaluable for me to improve the user experience. Please feel free to
        reach me out with any suggestions or issues you encounter.
      </p>
      <div className="flex gap-2 justify-center">
        <Link
          href="https://www.facebook.com/iamjohnandrei"
          target="_blank"
          className="relative z-30 px-4 py-2 ml-2 text-blue-400 text-lg font-medium transition-transform duration-300 ease-in-out hover:translate-x-1"
        >
          <IconBrandFacebook />
        </Link>
        <Link
          href="https://www.instagram.com/__iamdreiii/"
          target="_blank"
          className="relative z-30 px-4 py-2 ml-2 text-blue-400 text-lg font-medium transition-transform duration-300 ease-in-out hover:translate-x-1"
        >
          <IconBrandInstagram />
        </Link>
        <Link
          href="mailto:tacujan.andrei@gmail.com"
          target="_blank"
          className="relative z-30 px-4 py-2 ml-2 text-blue-400 text-lg font-medium transition-transform duration-300 ease-in-out hover:translate-x-1"
        >
          <IconBrandGmail />
        </Link>
      </div>

      <div className="absolute w-80 h-80 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-white to-transparent opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-10 z-20" />
      <div className="absolute w-80 h-80 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-white to-transparent opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-10 z-0" />
    </section>
  );
};

export default BetaTest;