"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { containVarients, itemVarients } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader, Loader2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import useCreateAIStore from "@/store/useCreativeAIStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardList from "../Common/CardList";
import usePromptStore from "@/store/usePromtStore";
import RecentPromts from "./RecentPromts";
import { toast } from "sonner";
import { generateCreativePrompt } from "@/actions/openai";
import { OutlineCard } from "srclib\types";
import { v4 } from "uuid";

type Props = {
  onBack: () => void;
};

const CreativeAI = ({ onBack }: Props) => {
  const { promts, addPrompt } = usePromptStore();
  const router = useRouter();
  const {
    CurrentAIPrompt,
    setCurrentPrompt,
    outlines,
    resetOutlines,
    addOutline,

    addMultipleOutlines,
  } = useCreateAIStore();
  const [noOfCards, setnoOfCards] = useState<number>(0);
  const [editingCard, setEditingCards] = useState<string | null>(null);
  const [selectedCard, setselectedCard] = useState<string | null>(null);
  const [isGenerating, setisGenerating] = useState(false);
  const [editText, setEditText] = useState("");

  const resetCards = () => {
    setEditingCards(null);
    setselectedCard(null);
    setEditText("");

    setCurrentPrompt("");
    resetOutlines();
  };

  const handleBack = () => {
    onBack();
  };

  const generateOutline = async () => {
    if (CurrentAIPrompt === "") {
      toast.error("Error", {
        description: "Please Enter Prompt",
      });
      return;
    }
    setisGenerating(true);
    const res = await generateCreativePrompt(CurrentAIPrompt);
    if (res.status === 200 && res?.data?.Outlines) {
      const cardsData: OutlineCard[] = [];
      res.data?.outlines.map((outline: string, idx: number) => {
        const newCard = {
          id: v4(),
          title: outline,
          order: idx + 1,
        };
        cardsData.push(newCard);
      });
      addMultipleOutlines(cardsData);
      setnoOfCards(cardsData.length);
      toast.success("Success", {
        description: " Outline Generated Successfully",
      });
    } else {
      toast.error("Error", {
        description: "Failed to Generate Outline",
      });
    }
    setisGenerating(false);
  };

  const handleGenerate = () => {};

  useEffect(() => {
    setnoOfCards(outlines.length);
  }, [outlines.length]);
  return (
    <motion.div
      className=" space-y-6 w-full border max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containVarients}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant="outline" className=" mb-4">
        <ChevronLeft className=" mr-2 h-4 w-4"></ChevronLeft>
        Back
      </Button>
      <motion.div variants={itemVarients} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Generate with <span className="text-vivid">Creative AI</span>
        </h1>
        <p className=" text-secondary">What would like to create today?</p>
      </motion.div>
      <motion.div
        className=" bg-primary/10 p-4 rounded-xl"
        variants={itemVarients}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 rounded-xl items-center">
          <Input
            onChange={(e) => setCurrentPrompt(e.target.value)}
            value={CurrentAIPrompt}
            className=" text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
            required
            placeholder="Enter Prompt and add to the cards..."
          ></Input>
          <div className="flex items-center gap-3">
            <Select
              value={noOfCards.toString()}
              onValueChange={(value: string) => setnoOfCards(parseInt(value))}
            >
              <SelectTrigger className=" w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards "></SelectValue>
                <SelectContent className=" w-fit">
                  {outlines.length === 0 ? (
                    <SelectItem value="0" className=" font-semibold">
                      No Cards
                    </SelectItem>
                  ) : (
                    Array.from({ length: outlines.length }, (_, i) => i).map(
                      (num) => (
                        <SelectItem
                          key={num}
                          value={num.toString()}
                          className=" font-semibold"
                        >
                          {num} {num === 1 ? "Card" : "Cards"}
                        </SelectItem>
                      )
                    )
                  )}
                </SelectContent>
              </SelectTrigger>
            </Select>
            <Button
              variant="destructive"
              onClick={resetCards}
              size="icon"
              aria-label=" Reset Cards"
            >
              <RotateCcw className=" h-4 w-4"></RotateCcw>
            </Button>
          </div>
        </div>
      </motion.div>
      <div className=" w-full flex justify-center items-center">
        <Button
          className=" font-medium text-lg flex gap-2 items-center"
          onClick={generateOutline}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className=" animate-spin mr-2"></Loader2> Generating
            </>
          ) : (
            "Generate Outline"
          )}
        </Button>
      </div>
      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText}
        onEditChange={setEditText}
        onCardSelect={setselectedCard}
        setEditingCard={setEditingCards}
        setSelectedCard={setselectedCard}
        setEditText={setEditText}
        onCardDoubleClick={(id, title) => {
          setEditingCards(id);
          setEditText(title);
        }}
      ></CardList>
      {outlines.length > 0 && (
        <Button
          className=" w-full"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className=" animate-spin mr-2"></Loader2> Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      )}
      {promts?.length > 0 && <RecentPromts></RecentPromts>}
    </motion.div>
  );
};

export default CreativeAI;
