import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  redirect("/dashboard");
  return <div></div>;
};

export default Page;
