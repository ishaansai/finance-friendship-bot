
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Default API key that will be used if no user-provided key exists
const DEFAULT_API_KEY = "your-default-api-key-here"; // Replace with your actual API key

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load API key from localStorage or use default
    const savedApiKey = localStorage.getItem("finance_app_api_key");
    setApiKey(savedApiKey || DEFAULT_API_KEY);
    setIsLoading(false);
  }, []);

  const saveApiKey = (key: string) => {
    localStorage.setItem("finance_app_api_key", key);
    setApiKey(key);
    toast.success("API key saved successfully");
  };

  const clearApiKey = () => {
    localStorage.removeItem("finance_app_api_key");
    setApiKey(DEFAULT_API_KEY); // Fall back to default instead of null
    toast.success("API key removed, using default key");
  };

  const checkApiKey = (): boolean => {
    // This will now always return true since we always have at least the default key
    return true;
  };

  return { apiKey, isLoading, checkApiKey, saveApiKey, clearApiKey };
};
