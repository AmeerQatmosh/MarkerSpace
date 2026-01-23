import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100); // Focus when expanding
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center">
      {isExpanded ? (
        <div className="relative flex items-center w-full max-w-md space-x-2 ">
          {/* Close button */}
          <button
            type="button"
            onClick={toggleSearch}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Search input */}
          <input
            ref={inputRef}
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            aria-label="Search"
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600
              px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
              dark:bg-gray-800 dark:text-gray-100"
          />

          {/* Clear button */}
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-10 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}

          {/* Submit/search button */}
          <a href="/no-results-found">
            <button
              type="submit"
              aria-label="Submit search"
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </a>
        </div>
      ) : (
        <button
          type="button"
          onClick={toggleSearch}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300
            dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <FontAwesomeIcon icon={faSearch} />
          <span>Search</span>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
