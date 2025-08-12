"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";


export default function NavbarWrapper() {
  const pathname = usePathname();

  // Un routes ka list jahan navbar nahi chahiye
  const hideNavbarRoutes = ["/sign-in", "/sign-up"];

  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
}
