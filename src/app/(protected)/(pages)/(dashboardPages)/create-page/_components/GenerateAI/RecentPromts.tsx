import usePromptStore from "@/store/usePromtStore";
import React from "react";
import { motion } from "framer-motion";
import { containVarients, itemVarients } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const RecentPromts = () => {
  const { promts, setPage } = usePromptStore();

  const handleEdit = (id: string) => {
    const prompt = promts.find((prompt) => prompt?.id === id);
    if (prompt) {
      setPage("create-scratch");
      addMultipleOutlines(prompt?.outlines);
      setCurrentPrompt(prompt?.title);
    }
  };

  // console.log(promts);
  return (
    <motion.div variants={containVarients} className=" space-y-4 mt-20">
      <motion.h2
        variants={itemVarients}
        className=" text-2xl font-semibold text-center"
      >
        Your Recent Prompts
      </motion.h2>
      <motion.div
        variants={containVarients}
        className=" space-y-2 w-full lg:max-w-[80%] mx-auto"
      >
        {promts.map((prompt, i) => (
          <motion.div key={i} variants={itemVarients}>
            <Card className=" hover:bg-accent/50 p-4 flex items-center justify-between transition-colors duration-300">
              <div className=" max-w-[70%]">
                <h3 className=" font-semibold text-xl line-clamp-1">
                  {prompt?.title}
                </h3>
                <p className=" font-semibold text-sm text-muted-foreground">
                  {timeAgo(prompt?.createdAt)}
                </p>
              </div>
              <div className=" flex items-center gap-4">
                <span className="text-sm text-vivid">Creative AI</span>
                <Button
                  variant="default"
                  size="sm"
                  className=" rounded-xl bg-primary-20 dark:hover:bg-gray-700  hover:bg-gray-200 text-primary"
                  onClick={() => handleEdit(prompt?.id)}
                >
                  Edit
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentPromts;
