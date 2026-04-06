'use client'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "../Helpers/icons";

const ThemeButton = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by waiting until component mounts
    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    if (!mounted) {
        // Render a placeholder with similar dimensions to prevent layout shift
        return <div className="w-[36px] h-[36px] p-2" />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full cursor-pointer bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                // Moon Icon
                <Moon />
            ) : (
                // Sun Icon
                <Sun />
            )}
        </button>
    );
};

export default ThemeButton;