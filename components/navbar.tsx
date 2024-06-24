"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Plus, Settings } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex h-20 w-full items-center border-b">
      <div className="container flex justify-between">
        <Button asChild size="icon" variant="outline">
          <Link href="/">
            <Home />
          </Link>
        </Button>
        <Button
          asChild
          className={cn(pathname === "/add-experience" && "invisible")}
        >
          <Link href="/add-experience">
            <Plus className="sm:mr-2" />
            <div className="hidden sm:inline-block">Ajouter expérience</div>
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
}
