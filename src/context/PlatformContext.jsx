import React, { useEffect, useMemo, useState } from "react";
import { PlatformContext } from "./platformContextInstance";

export function PlatformProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(() => {
    return {
      theme,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    };
  }, [theme]);

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}
