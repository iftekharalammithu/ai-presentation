import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

const UpperInfoSearchbar = () => {
  return (
    <div className=" min-w-[60%] relative flex items-center border rounded-full bg-background-80">
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className=" absolute left-0 h-full rounded-l-none bg-transparent hover:bg-transparent"
      >
        <Search className=" h-4 w-4"></Search>
        <span className="sr-only">Search</span>
      </Button>
      <Input
        type="text"
        placeholder="Search"
        className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 ml-6"
      ></Input>
    </div>
  );
};

export default UpperInfoSearchbar;
