import { useMemo } from "react";
import toast from "react-hot-toast";

export function useToast() {
  return useMemo(() => {
    return {
      toast: {
        success: (message) => toast.success(message),
        error: (message) => toast.error(message),
        info: (message) => toast(message),
      },
    };
  }, []);
}
