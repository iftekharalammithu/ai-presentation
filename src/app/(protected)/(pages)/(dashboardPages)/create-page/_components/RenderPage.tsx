"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePromptStore from "@/store/usePromtStore";
import CreatePageStart from "./CreatePage/CreatePage";

const RenderPage = () => {
  const router = useRouter();
  const { page, setPage } = usePromptStore();

  const renderStep = () => {
    switch (page) {
      case "create":
        return <CreatePageStart></CreatePageStart>;
      case "creative-ai":
        return <> creative-ai</>;
      case "create-scratch":
        return <> create-scratch</>;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};

export default RenderPage;
