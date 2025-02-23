"use client";
import React from "react";
import { motion } from "framer-motion";
import { containVarients, CreatePageCard, itemVarients } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import RecentPromts from "../GenerateAI/RecentPromts";
import usePromptStore from "@/store/usePromtStore";

type Props = {
  onSelectOption: (option: string) => void;
};

const CreatePageStart = ({ onSelectOption }: Props) => {
  const { promts, setPage } = usePromptStore();
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containVarients}
      className=" space-y-8"
    >
      <motion.div variants={itemVarients} className=" text-center space-y-2">
        <h1 className=" text-4xl font-bold text-primary">
          How would you like to Started?
        </h1>
        <p className=" text-secondary">
          Choose Your preferred method to begain
        </p>
      </motion.div>
      <motion.div
        variants={containVarients}
        className="grid gap-6 md:grid-cols-3"
      >
        {CreatePageCard.map((option) => (
          <motion.div
            key={option.type}
            variants={itemVarients}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              transition: {
                duration: 0.1,
              },
            }}
            className={`${
              option.highlight
                ? "bg-vivid-gradient"
                : "hover:bg-vivid-gradient border"
            } rounded-xl p-[1px] transition-all duration-300 ease-in-out`}
          >
            <motion.div
              className=" w-full p-4 flex-col gap-y-6 items-start bg-white dark:bg-black rounded-xl"
              whileHover={{ transition: { duration: 0.1 } }}
            >
              <div className=" flex flex-col items-start w-full gap-y-3">
                <div>
                  <p className=" text-primary text-lg font-semibold">
                    {option.title}
                  </p>
                  <p
                    className={`${
                      option.highlight ? "text-vivid" : "text-primary"
                    } text-4xl font-bold`}
                  >
                    {option.highlightedText}
                  </p>
                </div>
                <p className=" text-secondary text-sm font-normal">
                  {option.description}
                </p>
              </div>
              <motion.div
                className=" self-end"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={option.highlight ? "default" : "outline"}
                  className=" w-fit rounded-xl font-bold"
                  size={"sm"}
                  onClick={() => onSelectOption(option.type)}
                >
                  {option.highlight ? "Generate" : "continue"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      <RecentPromts></RecentPromts>
    </motion.div>
  );
};

export default CreatePageStart;
