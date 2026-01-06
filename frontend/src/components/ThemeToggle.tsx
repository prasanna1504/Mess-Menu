'use client';

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="group relative w-16 h-8 rounded-full bg-gray-200 dark:bg-zinc-800 border border-black/5 dark:border-white/10 shadow-inner transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Toggle Theme"
        >
            {/* Sliding Thumb Container */}
            <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 cubic-bezier(0.4, 0.0, 0.2, 1) flex items-center justify-center ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
                    }`}
            >
                {/* Icons inside the thumb */}
                {theme === 'dark' ? (
                    <Moon className="w-3.5 h-3.5 text-indigo-500" fill="currentColor" fillOpacity={0.1} />
                ) : (
                    <Sun className="w-3.5 h-3.5 text-orange-400" fill="currentColor" fillOpacity={0.2} />
                )}
            </div>
        </button>
    );
}
