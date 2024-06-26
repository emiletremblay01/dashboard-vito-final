"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Experience } from "@prisma/client";
import { toast } from "sonner";
import { deleteExperience } from "@/actions/experience";
import { useRouter } from "next/navigation";
import { Edit, Trash } from "lucide-react";
export const columns: ColumnDef<Experience>[] = [
  {
    accessorKey: "title",
    header: "Titre",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return <Actions id={id} />;
    },
  },
];

function Actions({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(() => {
      deleteExperience(id).then((res) => {
        if (res.success) {
          toast(res.success);
          return;
        }
        toast(res.error);
      });
    });
  };

  const handleEdit = async () => {
    router.push("/" + id);
  };

  return (
    <div className="flex gap-1">
      <Button
        onClick={handleEdit}
        disabled={isPending}
        className="group h-fit rounded-full p-0"
        variant="ghost"
      >
        <Edit className="size-6 text-muted-foreground group-hover:text-primary" />{" "}
      </Button>
      <Button
        onClick={handleDelete}
        disabled={isPending}
        className="group h-fit rounded-full p-0"
        variant="ghost"
      >
        <Trash className="size-6 text-muted-foreground group-hover:text-red-400" />{" "}
      </Button>
    </div>
  );
}
