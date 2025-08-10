import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-3 shadow-md bg-white">
      {/* Left - Logo */}
      <div className="flex items-center gap-4">
        <Image
          src="/logo.webp"
          alt="logo"
          width={50}
          height={50}
          className="object-contain"
        />
      <div className="hidden md:flex gap-8 text-gray-700 font-medium">
        <h2 className="cursor-pointer hover:text-blue-500">Home</h2>
        <h2 className="cursor-pointer hover:text-blue-500">History</h2>
        <h2 className="cursor-pointer hover:text-blue-500">Help</h2>
      </div>
      </div>

      {/* Center - Links */}

      {/* Right - User Button */}
      <div>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
