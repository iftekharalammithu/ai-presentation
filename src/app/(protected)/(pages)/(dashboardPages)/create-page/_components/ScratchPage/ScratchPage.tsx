import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { containVarients, itemVarients } from "@/lib/constants";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import useOutlineStore from "@/store/useScratchStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CardList from "../Common/CardList";
import { OutlineCard } from "@/lib/types";
import { v4 } from "uuid";
import { toast } from "sonner";
import { createProject } from "@/actions/projects";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  onBack: () => void;
};

const ScratchPage = ({ onBack }: Props) => {
  const router = useRouter();
  const [editText, setEditText] = useState("");
  const [editingCard, setEditingCards] = useState<string | null>(null);
  const [selectedCard, setselectedCard] = useState<string | null>(null);

  const { setProject } = useSlideStore();
  const { outlines, resetOutlines, addOutline, addMultipleOutlines } =
    useOutlineStore();

  const handleBack = () => {
    resetOutlines();
    onBack();
  };

  const resetCard = () => {
    setEditText("");
    resetOutlines();
  };

  const handleAddCard = () => {
    const newCard: OutlineCard = {
      id: v4(),
      title: editText || "New Section",
      order: outlines.length + 1,
    };
    setEditText("");
    addOutline(newCard);
  };

  const handleGenerate = async () => {
    if (outlines.length === 0) {
      toast.error("Error", {
        description: "Please add at least one card to Generate PPT",
      });
      return;
    }
    const res = await createProject(outlines?.[0]?.title, outlines);
    if (res.status !== 200) {
      toast.error("Error", {
        description: res.error || "Failed to create project",
      });
      return;
    }
    if (res.data) {
      setProject(res.data);
      resetOutlines();
      toast.success("Success", {
        description: "Project created successfully",
      });
      router.push(`/presentation/${res.data.id}/select-theme`);
    } else {
      toast.error("Error", {
        description: "Failed to create project",
      });
    }
  };

  return (
    <motion.div
      className=" space-y-6 w-full border max-w-4xl mx-auto px-4 sm:px-6 lg:px-6"
      variants={containVarients}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant="outline" className="mb-4">
        <ChevronLeft className=" mr-2 h-4 w-4"></ChevronLeft>Back
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
        Prompt
      </h1>
      <motion.div
        className=" bg-primary/10 p-4 rounded-xl"
        variants={itemVarients}
      >
        <div className=" flex flex-col sm:flex-row justify-between items-center gap-3 rounded-xl">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Enter Prompt and add th the cards"
            className=" text-base sm:text-xl border-0 focus-visible:right-0 shadow-none p-0 bg-transparent flex-grow"
          ></Input>
          <div className=" flex items-center gap-3">
            <Select
              value={outlines.length > 0 ? outlines.length.toString() : "0"}
            >
              <SelectTrigger className=" w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards"></SelectValue>
              </SelectTrigger>
              <SelectContent className=" w-fit ">
                {outlines.length === 0 ? (
                  <SelectItem value="0" className=" font-semibold">
                    No Cards
                  </SelectItem>
                ) : (
                  Array.from(
                    { length: outlines.length },
                    (_, index) => index + 1
                  ).map((num) => (
                    <SelectItem
                      className=" font-semibold"
                      key={num}
                      value={num.toString()}
                    >
                      {num} {num === 1 ? "Card" : "Cards"}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              variant="destructive"
              onClick={resetCard}
              size="icon"
              aria-label="Reset Cards"
            >
              <RotateCcw className=" h-4 w-4 "></RotateCcw>
            </Button>
          </div>
        </div>
      </motion.div>
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
      <Button
        className=" w-full bg-primary-10"
        onClick={handleAddCard}
        variant="secondary"
      >
        Add Card
      </Button>
      {outlines?.length > 0 && (
        <Button className=" w-full" onClick={handleGenerate}>
          Generate PPT
        </Button>
      )}
    </motion.div>
  );
};

export default ScratchPage;
