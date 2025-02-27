import { Button } from "@/components/ui/button";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2, Wand2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  selectedTheme: Theme;
  themes: Theme[];
  onThemeSelect: (theme: Theme) => void;
};

const ThemePicker = ({ selectedTheme, themes, onThemeSelect }: Props) => {
  const router = useRouter();
  const params = useParams();

  const { project, setSlides, currentTheme } = useSlideStore();
  const [loading, setLoading] = useState(false);

  const handleGenerateLayout = async () => {
    setLoading(true);
    if (!selectedTheme) {
      toast.error("Error", {
        description: "Please select a theme",
      });
    }
  };

  return (
    <div
      className=" w-[400px] overflow-hidden sticky top-0 h-screen flex flex-col"
      style={{
        backgroundColor:
          selectedTheme.sidebarColor || selectedTheme.backgroundColor,
        borderLeft: `1px solid ${selectedTheme.accentColor}20`,
      }}
    >
      <div className=" p-8 space-y-6 flex-shrink-0">
        <div className=" space-y-2">
          <h2
            className=" text-3xl font-bold tracking-tight"
            style={{ color: selectedTheme.accentColor }}
          >
            Pick a Theme
          </h2>
          <p
            className="text-sm"
            style={{ color: `${selectedTheme.accentColor}80` }}
          >
            Choose from our created collection or generate a custom theme
          </p>
        </div>
        <Button
          className=" w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.backgroundColor,
          }}
          onClick={handleGenerateLayout}
        >
          {loading ? (
            <Loader2 className=" mr-2 h-5 w-5"></Loader2>
          ) : (
            <Wand2 className=" mr-2 h-5 w-5"></Wand2>
          )}
          {loading ? (
            <p className=" animate-pulse">Generating...</p>
          ) : (
            "Generate Theme"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ThemePicker;
