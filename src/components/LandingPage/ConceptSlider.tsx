import { useState, useEffect } from "react";
import {
  Bookmark,
  Folder,
  FileText,
  BarChart2,
  Search,
  Star,
  Users,
  Moon,
  Cloud,
  Bell,
  Activity,
} from "lucide-react";

const slides = [
  [
    { title: "Bookmarks", description: "Save and organize your links", icon: <Bookmark className="w-8 h-8 text-cyan-600 dark:text-cyan-400" /> },
    { title: "Collections", description: "Group items and notes together", icon: <Folder className="w-8 h-8 text-yellow-600 dark:text-yellow-400" /> },
    { title: "Notes", description: "Attach notes to everything", icon: <FileText className="w-8 h-8 text-green-600 dark:text-green-400" /> },
    { title: "Tracking", description: "Visualize your usage and stats", icon: <BarChart2 className="w-8 h-8 text-purple-600 dark:text-purple-400" /> },
  ],
  [
    { title: "Focus Mode", description: "Hide distractions", icon: <Moon className="w-8 h-8 text-pink-600 dark:text-pink-400" /> },
    { title: "Search", description: "Find anything quickly", icon: <Search className="w-8 h-8 text-orange-600 dark:text-orange-400" /> },
    { title: "Favorites", description: "Star important items", icon: <Star className="w-8 h-8 text-indigo-600 dark:text-indigo-400" /> },
    { title: "Sharing", description: "Share with your team", icon: <Users className="w-8 h-8 text-teal-600 dark:text-teal-400" /> },
  ],
  [
    { title: "Dark Mode", description: "Easy on the eyes", icon: <Moon className="w-8 h-8 text-gray-600 dark:text-gray-300" /> },
    { title: "Cloud Sync", description: "Access anywhere", icon: <Cloud className="w-8 h-8 text-blue-600 dark:text-blue-400" /> },
    { title: "Notifications", description: "Never miss updates", icon: <Bell className="w-8 h-8 text-lime-600 dark:text-lime-400" /> },
    { title: "Insights", description: "See your usage trends", icon: <Activity className="w-8 h-8 text-rose-600 dark:text-rose-400" /> },
  ],
];

export default function ConceptSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Slider */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((group, idx) => (
          <div key={idx} className="w-full shrink-0 px-6">
            <div
              className="
                grid gap-6
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                max-w-7xl mx-auto
              "
            >
              {group.map((item, i) => (
                <div
                  key={i}
                  className="
                    flex flex-col items-center text-center
                    rounded-3xl p-6
                    bg-white dark:bg-gray-900
                    border border-border
                    shadow-md hover:shadow-xl
                    transition
                  "
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              current === idx
                ? "bg-cyan-600 dark:bg-cyan-400"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
