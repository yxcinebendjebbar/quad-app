"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { HexagonIcon } from "lucide-react";
import Link from "next/link";
import Anchor from "./anchor";
import { SheetLeftbar } from "./leftbar";
import { page_routes } from "@/lib/routes-config";
import { useTheme } from "next-themes";

export const NAVLINKS = [
  {
    title: "Documentation",
    href: `/docs${page_routes[0].href}`,
  },
  {
    title: "GitHub",
    href: "https://github.com/yxcinebendjebbar/quad-app",
  },
];

export function Navbar() {
  return (
    <nav className="w-full h-14 sticky top-0 z-50 lg:px-4 backdrop-filter backdrop-blur-xl bg-opacity-5">
      <div className="sm:container h-full max-sm:px-3 flex items-center justify-between ">
        <SheetLeftbar />
        <div className="flex items-center gap-9">
          <Logo />
          <div className="lg:flex hidden items-center gap-5 text-sm font-medium text-muted-foreground">
            {NAVLINKS.map((item) => {
              return (
                <Anchor
                  key={item.title + item.href}
                  activeClassName="text-primary font-semibold"
                  absolute
                  className="flex items-center gap-1"
                  href={item.href}
                >
                  {item.title}
                </Anchor>
              );
            })}
          </div>
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
}

function Logo() {
  const { theme } = useTheme();
  return (
    <Link href="/" className="flex items-center gap-3">
      <img
        src={theme === "dark" ? "/logo-white.png" : "/logo-black.png"}
        className="w-8"
        draggable="false"
      />
      <h2 className="text-md font-bold font-code">Quad App</h2>
    </Link>
  );
}
