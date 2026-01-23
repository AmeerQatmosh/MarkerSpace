import React, { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  id?: string;
  live?: boolean; // if true, search on typing
}

const HomePageSearchBar: FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  className = "",
  id,
  live = true,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (live) {
      const timer = setTimeout(() => {
        onSearch(query);
      }, 250); // small debounce
      return () => clearTimeout(timer);
    }
  }, [query, live, onSearch]);

  return (
    <form
      id={id}
      onSubmit={(e) => {
        e.preventDefault();
        if (!live) onSearch(query);
      }}
      className={`flex items-center border overflow-hidden ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-grow px-4 py-2 focus:outline-none"
        aria-label="Search input"
      />
      <button
        type="submit"
        className="text-gray-900 px-3 py-2 rounded transition hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-50"
        aria-label="Submit search"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default HomePageSearchBar;
