import { useEffect, useRef, useState } from "react";

export function useAnimatedCounter(target, duration = 1200, shouldStart = true) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) {
      setValue(0);
      return undefined;
    }

    const start = performance.now();
    const numericTarget = Number(target) || 0;

    const tick = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(numericTarget * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [target, duration, shouldStart]);

  return value;
}
