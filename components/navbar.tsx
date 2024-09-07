"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Plus, UserCircle2 } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex min-h-20 w-full items-center border-b">
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
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild size="icon" variant="outline">
            <Link href="/auth">
              <UserCircle2 />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
