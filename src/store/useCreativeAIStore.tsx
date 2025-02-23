import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreateAIStore = {
  outlines: OutlineCard[] | [];
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  // setCurrentPrompt:
  addOutline: (outline: OutlineCard) => void;
  // removeOutline: (id: string) => void
};

const useCreateAIStore = create<CreateAIStore>()(
  persist(
    (set) => ({
      outlines: [],
      addMultipleOutlines: (outlines: OutlineCard[]) =>
        set((state) => ({ outlines: [...state.outlines, ...outlines] })),
      addOutline: (outline: OutlineCard) =>
        set((state) => ({ outlines: [...state.outlines, outline] })),
    }),
    {
      name: "creative-ai",
    }
  )
);

export default useCreateAIStore;
