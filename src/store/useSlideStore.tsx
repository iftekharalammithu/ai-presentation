import { ContentItem, Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { v4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
  slides: Slide[];
  project: Project | null;
  setSlides: (slides: Slide[]) => void;
  setProject: (project: Project | null) => void;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  getOrderSlides: () => Slide[];
  reorderSlides: (fromIndex: number, toIndex: number) => void;
  currentSlide: number;
  removeSlide: (id: string) => void;
  addSlideAtIndex: (slide: Slide, index: number) => void;
  setCurrentSlide: (index: number) => void;
  updateContentItem: (
    slideId: string,
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
}

const defaultTheme: Theme = {
  name: "Default",
  fontFamily: "Inter, sans-serif",
  fontColor: "#333333",
  backgroundColor: "#f0f0f0",
  slideBackgroundColor: "#ffffff",
  accentColor: "#3ba82f6",
  type: "light",
};

export const useSlideStore = create(
  persist<SlideState>(
    (set, get) => ({
      //State and Actions
      slides: [],
      project: null,
      setSlides: (slides: Slide[]) => set({ slides }),
      setProject: (project: Project | null) => set({ project }),
      currentTheme: defaultTheme,
      setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
      getOrderSlides: () => {
        const state = get();
        return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder);
      },
      reorderSlides: (fromIndex: number, toIndex: number) =>
        set((state) => {
          const newSlides = [...state.slides];
          const [removed] = newSlides.splice(fromIndex, 1);
          newSlides.splice(toIndex, 0, removed);
          return {
            slides: newSlides.map((slide, index) => ({
              ...slide,
              slideOrder: index,
            })),
          };
        }),
      removeSlide: (id: string) =>
        set((state) => ({
          slides: state.slides.filter((slide) => slide.id !== id),
        })),
      addSlideAtIndex: (slide: Slide, index: number) =>
        set((state) => {
          const newSlides = [...state.slides];
          newSlides.splice(index, 0, { ...slide, id: v4() });
          newSlides.forEach((s, i) => {
            s.slideOrder = i;
          });
          return { slides: newSlides, currentSlide: index };
        }),
      currentSlide: 0,
      setCurrentSlide: (index: number) => {
        set({ currentSlide: index });
      },
      updateContentItem: (
        slideId: string,
        contentId: string,
        newContent: string | string[] | string[][]
      ) => {
        set((state) => {
          const UpdateContentRecursively = (item: ContentItem): ContentItem => {
            if (item.id === contentId) {
              return { ...item, content: newContent };
            }
            if (
              Array.isArray(item.content) &&
              item.content.every((i) => typeof i !== "string")
            ) {
              return {
                ...item,
                content: item.content.map((subItem) => {
                  if (typeof subItem !== "string") {
                    return UpdateContentRecursively(subItem as ContentItem);
                  }
                  return subItem;
                }) as ContentItem[],
              };
            }
            return item;
          };
          return {
            slides: state.slides.map((slide) =>
              slide.id === slideId
                ? { ...slide, content: UpdateContentRecursively(slide.content) }
                : slide
            ),
          };
        });
      },
    }),

    {
      name: "slides-storage",
    }
  )
);
