import React, { FC, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  id?: string;
  live?: boolean; // if true, search on typing
  showQuery?: boolean; // show current query text
}

const HomePageSearchBar: FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  className = "",
  id,
  live = true,
  showQuery = true,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!live) return;
    const timer = setTimeout(() => {
      onSearch(query);
    }, 250);
    return () => clearTimeout(timer);
  }, [query, live, onSearch]);

  const handleSearchClick = () => {
    if (!live) onSearch(query);
  };

  return (
    <div id={id} className={`flex flex-col gap-2 ${className}`}>
      <div className="relative w-full">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pr-10 pl-4 py-2 rounded-lg bg-card"
          aria-label="Search input"
        />

        <Search
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
      </div>

    </div>
  );
};

export default HomePageSearchBar;
