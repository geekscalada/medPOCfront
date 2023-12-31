import { useState, useEffect, useRef } from "react";

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const latestValue = useRef(value);

  useEffect(() => {
    latestValue.current = value; // Actualiza la referencia al valor más reciente
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(latestValue.current); // Usa el valor más reciente
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay]);

  return debouncedValue;
}


export default useDebounce;
