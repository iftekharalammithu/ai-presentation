"use client";
import { OutlineCard } from "@/lib/types";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";

type Props = {
  outlines: OutlineCard[];
  editingCard: string | null;
  selectedCard: string | null;
  editText: string;
  addOutline?: (card: OutlineCard) => void;
  onEditChange: (value: string) => void;
  onCardSelect: (id: string) => void;
  onCardDoubleClick: (id: string, title: string) => void;
  setEditText: (value: string) => void;
  setEditingCard: (id: string | null) => void;
  setSelectedCard: (id: string | null) => void;
  addMultipleOutlines: (cards: OutlineCard[]) => void;
};

const CardList = ({
  outlines,
  editingCard,
  selectedCard,
  editText,
  addOutline,
  onEditChange,
  onCardSelect,
  onCardDoubleClick,
  setEditText,
  setEditingCard,
  setSelectedCard,
  addMultipleOutlines,
}: Props) => {
  const [draggedItem, setdraggedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dargOffsetY = useRef<number>(0);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (!draggedItem) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const theshhold = rect.height / 2;

    if (y < theshhold) {
      setDragOverIndex(index);
    } else {
      setDragOverIndex(index + 1);
    }
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || dragOverIndex === null) {
      return;
    }
    const updateCards = [...outlines];
    const draggedIndex = updateCards.findIndex(
      (card) => card.id === draggedItem.id
    );
    if (draggedIndex === -1 || draggedIndex === dragOverIndex) {
      return;
    }
    const [removedCard] = updateCards.splice(draggedIndex, 1);
    updateCards.splice(
      dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex,
      0,
      removedCard
    );
    addMultipleOutlines(
      updateCards.map((card, i) => ({ ...card, order: (i + 1).toString() }))
    );
    setdraggedItem(null);
    setDragOverIndex(null);
  };

  const onCardUpdate = (id: string, newTitle: string) => {
    addMultipleOutlines(
      outlines.map((card) =>
        card.id === id ? { ...card, title: newTitle } : card
      )
    );
    setEditingCard(null);
    setEditText("");
    setSelectedCard(null);
  };

  const onCardDelete = (id: string) => {
    addMultipleOutlines(
      outlines
        .filter((card) => card.id !== id)
        .map((card, index) => ({ ...card, order: (index + 1).toString() }))
    );
  };

  const onDragStart = (e: React.DragEvent, card: OutlineCard) => {
    setdraggedItem(card);
    e.dataTransfer.effectAllowed = "move";

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dargOffsetY.current = e.clientY - rect.top;
    const dragged = e.currentTarget.cloneNode(true) as HTMLElement;
    dragged.style.position = "absolute";
    dragged.style.top = "-1000px";
    dragged.style.opacity = "0.8";
    dragged.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px)}`;
    document.body.appendChild(dragged);
    e.dataTransfer.setDragImage(dragged, 0, dargOffsetY.current);

    setTimeout(() => {
      setDragOverIndex(outlines.findIndex((c) => c.id === card.id));
      document.body.removeChild(dragged);
    }, 0);
  };

  const onDragEnd = () => {
    setdraggedItem(null);
    setDragOverIndex(null);
  };

  const getDragOverStyles = (cardIndex: number) => {
    if (dragOverIndex === null || draggedItem === null) {
      return {};
    }
    if (cardIndex === dragOverIndex) {
      return {
        borderTop: "2px solid #000",
        marginTop: "0.5rem",
        transition: "margin 0.2s cubit-bezier(0.25,0.1,0.25,1)",
      };
    } else if (cardIndex === dragOverIndex - 1) {
      return {
        borderBottom: "2px solid #000",
        marginBottom: "0.5rem",
        transition: "margin 0.2s cubit-bezier(0.25,0.1,0.25,1)",
      };
    }
    return {};
  };

  return (
    <motion.div
      className=" space-y-2"
      layout
      onDragOver={(e) => {
        e.preventDefault();
        if (
          outlines.length === 0 ||
          e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20
        ) {
          onDragOver(e, outlines.length);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(e);
      }}
    >
      <AnimatePresence>
        {outlines.map((card, idex) => (
          <React.Fragment key={card.id}>
            <Card
              onDragOver={(e) => onDragOver(e, idex)}
              card={card}
              isEditing={editingCard === card.id}
              isSelected={selectedCard === card.id}
              editText={editText}
              onEditChange={onEditChange}
              onEditBlur={() => onCardUpdate(card.id, editText)}
              onEditKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCardUpdate(card.id, editText);
                }
              }}
              onCardClick={() => onCardSelect(card.id)}
              onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
              onDeleteClick={() => onCardDelete(card.id)}
              dragHandlers={{
                onDragStart: (e) => onDragStart(e, card),
                onDragEnd: onDragEnd,
              }}
              dragOverStyles={getDragOverStyles(index)}
            ></Card>
          </React.Fragment>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardList;
