// src/hooks/useDebounce.ts
import { useEffect, useState } from "react";

/**
 * A hook that returns a value after a specified delay.
 * Useful for preventing rapid API calls or URL updates.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If the value changes before the timer finishes, clear it and start over
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}