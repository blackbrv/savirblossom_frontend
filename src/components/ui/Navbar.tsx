import { NavbarListItem } from "@/lib/utils/constants";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-2 items-center justify-center bg-white">
      {NavbarListItem.map((nav, index) => (
        <Link href={nav.href} key={index} className="flex p-1 items-center">
          {nav.label}
        </Link>
      ))}
    </nav>
  );
}
