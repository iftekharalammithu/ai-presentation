"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input relative",
      className
    )}
    {...props}
    ref={ref}
  >
    <Moon
      className={cn(
        "h-4 w-4 absolute z-[1000] top-[6px] left-[4px] stroke-gray-700 fill-white transition-opacity duration-300 ease-in-out",
        "data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100"
      )}
    />
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-1 transition-transform data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-0"
      )}
    />
    <Sun
      className={cn(
        "h-4 w-4 absolute z-[1000] top-[6px] right-[9px] stroke-gray-700 fill-white transition-opacity duration-300 ease-in-out",
        "data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
