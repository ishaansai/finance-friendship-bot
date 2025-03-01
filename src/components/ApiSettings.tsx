
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { KeyRound, Info } from "lucide-react";
import { useApiKey } from "@/hooks/useApiKey";

const ApiSettings = () => {
  const [inputApiKey, setInputApiKey] = useState("");
  const { apiKey, isCustomKey, saveApiKey, clearApiKey } = useApiKey();

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("finance_app_api_key");
    if (savedApiKey) {
      setInputApiKey(savedApiKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!inputApiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    saveApiKey(inputApiKey);
  };

  const handleClearApiKey = () => {
    clearApiKey();
    setInputApiKey("");
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <KeyRound className="h-5 w-5 mr-2 text-finance-blue" />
          API Settings
        </CardTitle>
        <CardDescription>
          {isCustomKey 
            ? "Your custom API key is currently being used for all AI features"
            : "A default API key is provided, but you can use your own for better results"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start p-3 bg-blue-50 rounded-md text-blue-700">
            <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Important:</p>
              <p>The API key is used for all AI features: Scenarios, AI Advisor, and Finance Chat.</p>
              <p className="mt-1">Current status: {isCustomKey ? "Using your custom API key" : "Using default API key"}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter your API key"
                value={inputApiKey}
                onChange={(e) => setInputApiKey(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveApiKey} className="w-full">
                  Save API Key
                </Button>
                {isCustomKey && (
                  <Button onClick={handleClearApiKey} variant="outline" className="w-full">
                    Use Default Key
                  </Button>
                )}
              </div>
            </div>
            
            <p className="text-sm text-green-600 mt-2">
              ✓ AI features are enabled {isCustomKey ? "with your custom key" : "with the default key"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiSettings;
