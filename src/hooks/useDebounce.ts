import { useEffect, useState } from "react";

// Default delay value of 300ms
const DEFAULT_DELAY = 300;

const useDebounce = <T>(value: T, delay: number = DEFAULT_DELAY): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Ensure delay is a positive number
    if (delay <= 0) {
      console.warn("Debounce delay should be a positive number.");
      return;
    }

    // Set up the debounce timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout on unmount or when dependencies change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect if value or delay changes

  return debouncedValue;
};

export default useDebounce;
