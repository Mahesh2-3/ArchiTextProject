"use client";
import { useEffect, useState } from "react";
import { Palette } from "../Helpers/icons";
import { useThemeStore } from "../store/useThemeStore";

const themes = [
  "light",
  "forest-vibes",
  "sunset",
  "earth",
  "ocean",
  "night",
  "vintage",
];

const ThemeButton = () => {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  // Prevent hydration mismatch by waiting until component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    setIsRotating(true);
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);

    // Reset rotation state after animation duration
    setTimeout(() => setIsRotating(false), 500);
  };

  if (!mounted) {
    return <div className="w-[44px] h-[44px] p-2" />;
  }

  return (
    <button
      onClick={cycleTheme}
      className={`
                group relative p-2.5 rounded-2xl cursor-pointer 
                bg-(--bg-side) text-(--text-main) 
                hover:opacity-90 active:scale-95
                transition-all duration-300 ease-out
                border border-(--accent)
                shadow-sm hover:shadow-md
                overflow-hidden
            `}
      aria-label="Cycle Theme"
      title={`Current theme: ${theme}`}
    >
      <div
        className={`
                transition-transform duration-500 ease-in-out
                ${isRotating ? "rotate-360 scale-110" : "rotate-0 scale-100"}
                flex items-center justify-center
            `}
      >
        <Palette className="text-xl text-(--text-main)" />
      </div>

      {/* Subtle glow effect using accent color */}
      <div className="absolute inset-0 bg-(--accent)/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default ThemeButton;
