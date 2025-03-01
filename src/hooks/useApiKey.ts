import { useState, useEffect } from "react";
import { toast } from "sonner";

// Replace this with your actual API key
const DEFAULT_API_KEY = "your-api-key-goes-here"; 

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string>(DEFAULT_API_KEY);
  const [isLoading, setIsLoading] = useState(true);
  const [isCustomKey, setIsCustomKey] = useState(false);

  useEffect(() => {
    // Load API key from localStorage or use default
    const savedApiKey = localStorage.getItem("finance_app_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsCustomKey(true);
    } else {
      setApiKey(DEFAULT_API_KEY);
      setIsCustomKey(false);
    }
    setIsLoading(false);
  }, []);

  const saveApiKey = (key: string) => {
    if (!key || key.trim() === "") {
      toast.error("API key cannot be empty");
      return;
    }
    
    localStorage.setItem("finance_app_api_key", key);
    setApiKey(key);
    setIsCustomKey(true);
    toast.success("API key saved successfully");
  };

  const clearApiKey = () => {
    localStorage.removeItem("finance_app_api_key");
    setApiKey(DEFAULT_API_KEY);
    setIsCustomKey(false);
    toast.success("API key removed, using default key");
  };

  const checkApiKey = (): boolean => {
    return apiKey !== null && apiKey !== "";
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
