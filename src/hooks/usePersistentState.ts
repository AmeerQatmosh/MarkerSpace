import { useState, useEffect } from "react";

/**
 * usePersistentState
 * Stores a state in localStorage, scoped by key (can include page)
 *
 * @param key - unique key to store this value (e.g., "home-viewMode")
 * @param defaultValue - initial value if nothing is stored
 */
export function usePersistentState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // fail silently
    }
  }, [key, state]);

  return [state, setState] as const;
}
