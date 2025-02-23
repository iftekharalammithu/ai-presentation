"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePromptStore from "@/store/usePromtStore";
import CreatePageStart from "./CreatePage/CreatePage";
import CreativeAI from "./GenerateAI/CreativeAI";

const RenderPage = () => {
  const router = useRouter();
  const { page, setPage } = usePromptStore();

  const handleBack = () => {
    setPage("create");
  };

  const handleSelectOption = (option: string) => {
    if (option === "template") {
      router.push("/templates");
    } else if (option === "create-scratch") {
      setPage("create-scratch");
    } else {
      setPage("creative-ai");
    }
  };

  const renderStep = () => {
    switch (page) {
      case "create":
        return (
          <CreatePageStart
            onSelectOption={handleSelectOption}
          ></CreatePageStart>
        );
      case "creative-ai":
        return <CreativeAI onBack={handleBack}></CreativeAI>;
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
