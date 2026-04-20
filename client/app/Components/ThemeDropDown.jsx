"use client";

import React, { useState, useRef, useEffect } from "react";
import { AngleDown, Palette } from "../Helpers/icons";
import { useThemeStore } from "../store/useThemeStore";

const themeOptions = [
  { id: "light", label: "Light", color: "#FF85BB", bg: "#061d53" },
  {
    id: "forest-vibes",
    label: "Forest Vibes",
    color: "#408A71",
    bg: "#091413",
  },
  { id: "sunset", label: "Sunset", color: "#FF5F00", bg: "#2d1300" },
  { id: "earth", label: "Earth", color: "#A47251", bg: "#2a1c15" },
  { id: "ocean", label: "Ocean", color: "#5478FF", bg: "#0a1445" },
  { id: "night", label: "Night", color: "#535C91", bg: "#070F2B" },
  { id: "vintage", label: "Vintage", color: "#9AB17A", bg: "#27261e" },
];

const ThemeDropDown = ({ item, isLast }) => {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // if (!mounted) return null;

  const activeTheme =
    themeOptions.find((t) => t.id === theme) ?? themeOptions[0];
  const IconComponent = item?.icon ?? Palette;

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Row trigger */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-4 px-5 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition group cursor-pointer ${
          !isLast ? "border-b border-gray-300 dark:border-gray-700" : ""
        }`}
      >
        {/* Icon pill */}
        <div className="w-10 h-10 rounded-lg bg-(--color-normal)/20 flex items-center justify-center shrink-0 group-hover:bg-(--color-normal)/30 transition">
          <IconComponent
            size={18}
            className="text-(--accent) group-hover:scale-110 transition-transform"
          />
        </div>

        {/* Label + description */}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-semibold text-(--text-normal) text-sm">
            {item?.label ?? "Theme"}
          </span>
          <span className="text-xs text-(--text-normal)/60 truncate">
            {item?.description ?? "Change the theme of the app"}
          </span>
        </div>

        {/* Active badge + chevron */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-(--color-normal)/10 text-(--color-normal)">
            {activeTheme.label}
          </span>
          <AngleDown
            size={12}
            className={`text-(--text-normal)/50 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          className="absolute right-4 z-50 w-52 py-2 mt-1 rounded-md shadow-2xl border border-white/10"
          style={{
            top: "100%",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <div className="flex flex-col gap-0.5 px-1 max-h-60 overflow-y-auto hide-scrollbar">
            {themeOptions.map((option) => {
              const isActive = theme === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    setTheme(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center cursor-pointer justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left group/btn ${
                    isActive ? "font-semibold" : "hover:bg-white/5"
                  }`}
                  style={{
                    backgroundColor: isActive ? `${option.color}20` : undefined,
                    color: isActive ? option.color : "var(--text-main)",
                  }}
                >
                  <span>{option.label}</span>
                  {/* Split-circle swatch */}
                  <div
                    className="w-5 h-5 rounded-full shrink-0 transition-transform group-hover/btn:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${option.bg} 50%, ${option.color} 50%)`,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeDropDown;
