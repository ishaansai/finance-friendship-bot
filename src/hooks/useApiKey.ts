
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Your pre-configured API key that all users will use
const YOUR_API_KEY = "your-api-key-here"; // Replace with your actual API key

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string>(YOUR_API_KEY);
  const [isLoading, setIsLoading] = useState(false);

  // This is now a simplified hook since we're using your key directly
  const checkApiKey = (): boolean => {
    return true; // Always return true since we're providing the key
  };

  return { 
    apiKey, 
    isLoading,
    isCustomKey: true, // Always true since we're using your key
    checkApiKey,
    saveApiKey: () => {}, // Empty function since users won't change the key
    clearApiKey: () => {}  // Empty function since users won't clear the key
  };
};
