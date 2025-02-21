"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Switch
        checked={theme === "light"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className=" h-[2rem] w-[4rem] pl-1 data-[state=checked]:bg-background-90"
        aria-label="Toggle Dark Mode"
      ></Switch>
    </div>
  );
};

export default ThemeSwitcher;
