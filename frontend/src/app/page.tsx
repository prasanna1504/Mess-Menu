'use client';

import { useEffect, useState } from 'react';
import { fetchCurrentMenu, MenuData } from '@/lib/api';
import MealCard from '@/components/MealCard';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [data, setData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);
  const [todayIdx, setTodayIdx] = useState<number>(0);

  useEffect(() => {
    const loadMenu = async () => {
      const menu = await fetchCurrentMenu();
      if (menu) {
        setData(menu);

        // Find today's index based on Indian Standard Time logic (or local device time to be simple)
        const now = new Date();
        const currentWeekday = now.toLocaleDateString('en-US', { weekday: 'long' });
        const idx = menu.days.findIndex(d => d.day === currentWeekday);

        const validIdx = idx !== -1 ? idx : 0;
        setTodayIdx(validIdx);
        setActiveDayIdx(validIdx);
      }
      setLoading(false);
    };
    loadMenu();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="w-8 h-8 animate-spin opacity-50" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-light tracking-tight mb-2">No Menu Found</h1>
        <p className="text-foreground/40 font-light">Please ask the admin to upload a menu.</p>
      </div>
    );
  }

  if (data.days.length === 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-light tracking-tight mb-2">Empty Menu</h1>
        <p className="text-foreground/40 font-light">The menu data is empty.</p>
      </div>
    );
  }

  const activeDay = data.days[activeDayIdx];

  // Calculate dynamic date relative to "today"
  const getDynamicDate = () => {
    const now = new Date();
    const diffDays = activeDayIdx - todayIdx;
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diffDays);

    return {
      weekday: activeDay.day, // Use the day name from the data to be safe
      fullDate: targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
  };

  const { weekday, fullDate } = getDynamicDate();

  const handlePrev = () => {
    setActiveDayIdx(prev => (prev > 0 ? prev - 1 : data.days.length - 1));
  };

  const handleNext = () => {
    setActiveDayIdx(prev => (prev < data.days.length - 1 ? prev + 1 : 0));
  };

  return (
    <main className="h-screen w-screen bg-background text-foreground flex flex-col overflow-hidden selection:bg-purple-500/30">
      {/* Ambient Background Gradient (Subtle) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 via-background to-background dark:from-gray-900/40 dark:via-[#050505] dark:to-[#050505] pointer-events-none transition-colors duration-500" />

      {/* Header / Navigation */}
      <header className="relative z-20 flex-none h-24 flex flex-col items-center justify-center">
        {/* Top Controls */}
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <img src="/icon.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-md" />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">Mess Mate</span>
        </div>

        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-6 md:gap-12">
          <button onClick={handlePrev} className="p-3 text-foreground/20 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center">
            {/* Day Only (Logo Moved) */}
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-thin tracking-tighter text-foreground">
                {weekday}
              </h2>
            </div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-foreground/40 uppercase mt-2">
              {fullDate}
            </p>
          </div>

          <button onClick={handleNext} className="p-3 text-foreground/20 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Desktop Content (Grid) */}
      <div className="relative z-10 hidden md:flex flex-1 w-full h-full p-8 overflow-hidden">
        <div className="grid grid-cols-4 gap-6 w-full h-full max-w-[1600px] mx-auto">
          {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map((type) => {
            const meal = activeDay.meals.find(m => m.type.toLowerCase().includes(type.toLowerCase()));

            // Determine if this is the active meal "Right Now"
            const now = new Date();
            const currentHour = now.getHours();
            let isCurrentTime = false;

            if (activeDayIdx === todayIdx) { // Only highlight on "Today"
              if (type === 'Breakfast' && currentHour >= 4 && currentHour < 11) isCurrentTime = true;
              else if (type === 'Lunch' && currentHour >= 11 && currentHour < 16) isCurrentTime = true;
              else if (type === 'Snacks' && currentHour >= 16 && currentHour < 19) isCurrentTime = true;
              else if (type === 'Dinner' && (currentHour >= 19 || currentHour < 4)) isCurrentTime = true;
            }

            return (
              <MealCard
                key={type}
                type={type}
                items={meal ? meal.items : ['—']}
                isActive={isCurrentTime}
              />
            );
          })}
        </div>
      </div>

      {/* Mobile Content */}
      <div className="relative z-10 md:hidden flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-24 no-scrollbar">
        {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map((type) => {
          const meal = activeDay.meals.find(m => m.type.toLowerCase().includes(type.toLowerCase()));
          return (
            <div key={type} className="h-[400px]">
              <MealCard
                type={type}
                items={meal ? meal.items : ['—']}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
