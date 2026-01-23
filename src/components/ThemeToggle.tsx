import React from "react";

type Theme = "light" | "dark" | "system";

interface Props {
  theme: Theme;
  setTheme: React.Dispatch<Theme>;
}

const ThemeToggle: React.FC<Props> = ({ theme, setTheme }) => {
  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      className="bg-gray-700 text-white dark:bg-gray-300 dark:text-black px-2 py-1 rounded"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
};

export default ThemeToggle;
