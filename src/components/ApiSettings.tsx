
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import { useApiKey } from "@/hooks/useApiKey";

const ApiSettings = () => {
  const [inputApiKey, setInputApiKey] = useState("");
  const { apiKey, saveApiKey, clearApiKey } = useApiKey();
  const [isCustomKey, setIsCustomKey] = useState(false);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("finance_app_api_key");
    if (savedApiKey) {
      setInputApiKey(savedApiKey);
      setIsCustomKey(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!inputApiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    saveApiKey(inputApiKey);
    setIsCustomKey(true);
  };

  const handleClearApiKey = () => {
    clearApiKey();
    setInputApiKey("");
    setIsCustomKey(false);
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
            ? "Update or remove your custom API key"
            : "A default API key is provided, but you can use your own for better results"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {isCustomKey 
                ? "You are currently using your custom API key."
                : "You are currently using the application's default API key. For more personalized responses, you can enter your own API key."}
            </p>
            
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
