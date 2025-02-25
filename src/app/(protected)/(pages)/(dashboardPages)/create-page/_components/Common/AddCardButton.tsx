"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onAddCard: () => void;
};

const AddCardButton = ({ onAddCard }: Props) => {
  const [showGap, setshowGap] = useState(false);

  return (
    <motion.div
      className=" w-full relative overflow-hidden"
      initial={{ height: "0.5rem" }}
      animate={{
        height: showGap ? "2rem" : "0.5rem",
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      onHoverStart={() => setshowGap(true)}
      onHoverEnd={() => setshowGap(false)}
    >
      <AnimatePresence>
        {showGap && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className=" absolute inset-0 flex items-center justify-center"
          >
            <div className=" w-[40%] h-[1px] bg-primary"></div>
            <Button
              variant="outline"
              size="sm"
              className=" rounded-full h-8 w-8 p0 bg-primary hover:bg-primary"
              onClick={onAddCard}
              aria-label="Add New Card"
            >
              <Plus className=" h-4 w-4 text-black"></Plus>
            </Button>
            <div className=" w-[40%] h-[1px] bg-primary"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddCardButton;
