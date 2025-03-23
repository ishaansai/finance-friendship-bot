

import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomKey, setIsCustomKey] = useState(false);

  // Load API key from localStorage on initial render
  useEffect(() => {
    const savedApiKey = localStorage.getItem("finance_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsCustomKey(true);
    }
  }, []);

  const saveApiKey = (key: string) => {
    if (!key.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    setIsLoading(true);
    
    // Simple validation - check if key has the expected format
    // In a real app, you'd validate with a real API call
    if (key.length < 10) {
      toast.error("API key format is invalid");
      setIsLoading(false);
      return;
    }

    localStorage.setItem("finance_api_key", key);
    setApiKey(key);
    setIsCustomKey(true);
    setIsLoading(false);
    toast.success("API key saved successfully");
  };

  const clearApiKey = () => {
    localStorage.removeItem("finance_api_key");
    setApiKey("");
    setIsCustomKey(false);
    toast.success("API key removed");
  };

  const checkApiKey = (): boolean => {
    if (!apiKey) {
      toast.error("API key is required. Please configure it in Settings.");
      return false;
    }
    return true;
  };

  return { 
    apiKey, 
    isLoading,
    isCustomKey,
    checkApiKey,
    saveApiKey,
    clearApiKey
  };
};
