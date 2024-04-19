"use client";

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

import updateTask from "@/actions/update-task";

import { Task } from "@/types/task";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


export default function ImportantToggle({ task }: { task: Task }) {
  async function toggleImportant(task: Task) {
    await updateTask(task.id, { isImportant: !task.isImportant });
  }

  const pathname = usePathname();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant={"link"}
            onClick={() => toggleImportant(task)}>
            {task.isImportant ?
              <StarFilledIcon className={cn(
                "w-5 h-5",
                pathname === "/tasks" && "text-accent-blue-foreground",
                pathname === "/important" && "text-accent-pink-foreground",
                pathname === "/myday" && "text-accent-green-foreground"
              )} /> :
              <StarIcon className={cn(
                "w-5 h-5",
                pathname === "/tasks" && "hover:text-accent-blue-foreground",
                pathname === "/important" && "hover:text-accent-pink-foreground",
                pathname === "/myday" && "hover:text-accent-green-foreground"
              )} />
            }
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {task.isImportant ? 'Remove from important' : 'Mark as important'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}