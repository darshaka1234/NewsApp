"use client";

import Link from "next/link";
import React from "react";
import { FaRegNewspaper } from "react-icons/fa";
import classnames from "classnames";
import { usePathname } from "next/navigation";
const NavBar = () => {
  const currentPath = usePathname();
  const navlinks = [
    { href: "/news", name: "News" },
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
            className={classnames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
