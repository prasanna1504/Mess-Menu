import React from 'react';
import { clsx } from 'clsx';

interface MealCardProps {
    type: string;
    items: string[];
    isActive?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({ type, items, isActive = false }) => {
    // Elegant, subtle gradients for each meal type
    // Increased opacity and added a secondary "fill" color
    let gradient = 'from-gray-500/20';
    let baseBg = 'hover:bg-gray-500/5';
    let accentColor = 'text-gray-200';
    let activeBorder = 'dark:border-white/20';
    let time = '';

    const t = type.toLowerCase();
    if (t.includes('breakfast')) {
        gradient = 'from-orange-400/30'; // Lighter orange (morning sun)
        baseBg = 'bg-orange-400/5 dark:bg-orange-400/5 hover:bg-orange-400/10';
        accentColor = 'text-orange-500 dark:text-orange-400';
        activeBorder = 'dark:border-orange-400/50 border-orange-300/50';
        time = '7:30AM - 9:30AM';
    } else if (t.includes('lunch')) {
        gradient = 'from-emerald-500/30';
        baseBg = 'bg-emerald-500/5 dark:bg-emerald-400/5 hover:bg-emerald-500/10';
        accentColor = 'text-emerald-600 dark:text-emerald-400';
        activeBorder = 'dark:border-emerald-500/50 border-emerald-400/50';
        time = '12PM - 2:30PM';
    } else if (t.includes('snack')) {
        // Switched to Purple/Violet as per request
        gradient = 'from-violet-500/30';
        baseBg = 'bg-violet-500/5 dark:bg-violet-400/5 hover:bg-violet-500/10';
        accentColor = 'text-violet-600 dark:text-violet-400';
        activeBorder = 'dark:border-violet-500/50 border-violet-400/50';
        time = '5PM - 6PM';
    } else if (t.includes('dinner')) {
        gradient = 'from-blue-500/30';
        baseBg = 'bg-blue-500/5 dark:bg-blue-400/5 hover:bg-blue-500/10';
        accentColor = 'text-blue-600 dark:text-blue-400';
        activeBorder = 'dark:border-blue-500/50 border-blue-400/50';
        time = '7:30PM - 9:30PM';
    }

    return (
        <div className={clsx(
            "group relative h-full flex flex-col overflow-hidden rounded-3xl backdrop-blur-3xl transition-all duration-500",
            // Base Backgrounds - now using the specific tint
            baseBg,
            "dark:bg-opacity-10",
            // Borders
            "border",
            isActive ? `${activeBorder} shadow-[0_0_30px_-5px_var(--tw-shadow-color)] dark:shadow-[0_0_40px_-5px_var(--tw-shadow-color)]` : "border-black/5 dark:border-white/5 shadow-sm dark:shadow-none",
            // Hover Effects
            !isActive && "hover:scale-[1.01] hover:shadow-xl",
            // Active Scale
            isActive && "scale-[1.02]",
            // Text color for shadow
            t.includes('breakfast') && isActive && "shadow-orange-400/20",
            t.includes('lunch') && isActive && "shadow-emerald-500/20",
            t.includes('snack') && isActive && "shadow-violet-500/20",
            t.includes('dinner') && isActive && "shadow-blue-500/20"
        )}>
            {/* Top Gradient Glow - Increased Height */}
            <div className={clsx(
                "absolute top-0 left-0 w-full h-32 bg-gradient-to-b to-transparent transition-opacity",
                isActive ? "opacity-80 dark:opacity-90" : "opacity-40 dark:opacity-50 group-hover:opacity-70 dark:group-hover:opacity-70",
                gradient
            )} />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <h3 className={clsx(
                        "text-xl font-medium tracking-wide uppercase transition-colors",
                        isActive ? "text-black dark:text-white" : "text-gray-800 dark:text-white/90"
                    )}>
                        {type}
                    </h3>
                    <p className={clsx("text-sm font-semibold mt-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5", accentColor)}>
                        {time}
                    </p>
                </div>

                {/* Menu Items */}
                <ul className="flex-1 flex flex-col items-center justify-start gap-4 text-center">
                    {items.map((item, index) => (
                        <li key={index} className={clsx(
                            "text-xl font-light tracking-wide leading-relaxed transition-colors",
                            isActive ? "text-gray-900 dark:text-white font-normal" : "text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white"
                        )}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MealCard;
