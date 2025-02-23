import usePromptStore from "@/store/usePromtStore";
import React from "react";
import { motion } from "framer-motion";
import { containVarients, itemVarients } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";

const RecentPromts = () => {
  const { promts, setPage } = usePromptStore();
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
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentPromts;
