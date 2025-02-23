import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type page = "create" | "creative-ai" | "create-scratch";
type Prompt = {
  id: string;
  createdAt: string;
  title: string;
  outlines: OutlineCard[] | [];
};

type PromptStore = {
  page: page;
  setPage: (page: page) => void;
  promts: Prompt[] | [];
  addPrompt: (prompt: Prompt) => void;
  removePrompt: (id: string) => void;
};

const usePromptStore = create<PromptStore>()(
  devtools(
    persist(
      (set) => ({
        page: "create",
        setPage: (page: page) => set({ page }),
        promts: [],
        addPrompt: (prompt: Prompt) => {
          set((state) => ({ promts: [...state.promts, prompt] }));
        },
        removePrompt: (id: string) => {
          set((state) => ({
            promts: state.promts.filter((prompt) => prompt.id !== id),
          }));
        },
      }),
      {
        name: "prompts",
      }
    )
  )
);

export default usePromptStore;
