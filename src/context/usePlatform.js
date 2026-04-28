import { useContext } from "react";
import { PlatformContext } from "./platformContextInstance";

export function usePlatform() {
  const context = useContext(PlatformContext);

  if (!context) {
    throw new Error("usePlatform must be used within PlatformProvider");
  }

  return context;
}