
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load API key from localStorage
    const savedApiKey = localStorage.getItem("finance_app_api_key");
    setApiKey(savedApiKey);
    setIsLoading(false);
  }, []);

  const checkApiKey = (): boolean => {
    if (!apiKey) {
      toast.error("Please add your API key in Settings to use this feature");
      return false;
    }
    return true;
  };

  return { apiKey, isLoading, checkApiKey };
};
