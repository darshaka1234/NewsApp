import Link from "next/link";
import React from "react";
import { FaRegNewspaper } from "react-icons/fa";
const NavBar = () => {
  const navlinks = [
    { href: "/article", name: "Article" },
    { href: "/dashboard", name: "Dashboard" },
  ];
  return (
    <div className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <FaRegNewspaper />
      </Link>
      <ul className="flex space-x-6">
        {navlinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
