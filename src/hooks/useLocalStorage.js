import { useCallback, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue((previousValue) => {
        const nextValue = value instanceof Function ? value(previousValue) : value;

        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          return previousValue;
        }

        return nextValue;
      });
    },
    [key],
  );

  return [storedValue, setValue];
}
