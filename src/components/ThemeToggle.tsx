
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize the switch state based on the current theme
  useEffect(() => {
    if (theme === "dark") {
      setIsDarkMode(true);
    } else if (theme === "light") {
      setIsDarkMode(false);
    } else if (theme === "system") {
      const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(systemIsDark);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        setIsDarkMode(mediaQuery.matches);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    setTheme(newIsDark ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      <Sun size={16} className="text-gray-700 dark:text-gray-400" />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <Moon size={16} className="text-gray-700 dark:text-gray-400" />
    </div>
  );
}
