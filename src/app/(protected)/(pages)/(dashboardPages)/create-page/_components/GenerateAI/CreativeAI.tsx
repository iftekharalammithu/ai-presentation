"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { containVarients } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type Props = {
  onBack: () => void;
};

const CreativeAI = ({ onBack }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    onBack();
  };
  return (
    <motion.div
      className=" space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containVarients}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant="outline" className=" mb-4">
        <ChevronLeft className=" mr-2 h-4 w-4"></ChevronLeft>
        Back
      </Button>
    </motion.div>
  );
};

export default CreativeAI;
