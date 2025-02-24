import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreateAIStore = {
  outlines: OutlineCard[] | [];
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  CurrentAIPrompt: string;
  setCurrentPrompt: (prompt: string) => void;
  addOutline: (outline: OutlineCard) => void;
  resetOutlines: () => void;
  // resetCurrentPrompt: ()
  // removeOutline: (id: string) => void
};

const useCreateAIStore = create<CreateAIStore>()(
  persist(
    (set) => ({
      //State and Actions
      outlines: [],
      CurrentAIPrompt: "",
      // function
      setCurrentPrompt: (prompt: string) => set({ CurrentAIPrompt: prompt }),
      addMultipleOutlines: (outlines: OutlineCard[]) =>
        set((state) => ({ outlines: [...state.outlines, ...outlines] })),
      addOutline: (outline: OutlineCard) =>
        set((state) => ({ outlines: [...state.outlines, outline] })),
      resetOutlines: () => set({ outlines: [] }),
    }),
    {
      name: "creative-ai",
    }
  )
);

export default useCreateAIStore;
