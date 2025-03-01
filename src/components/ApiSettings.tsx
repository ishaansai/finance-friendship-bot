
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

const ApiSettings = () => {
  const [apiKey, setApiKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("finance_app_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsSaved(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    // Save API key to localStorage
    localStorage.setItem("finance_app_api_key", apiKey);
    setIsSaved(true);
    toast.success("API key saved successfully");
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("finance_app_api_key");
    setApiKey("");
    setIsSaved(false);
    toast.success("API key removed");
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <KeyRound className="h-5 w-5 mr-2 text-finance-blue" />
          API Settings
        </CardTitle>
        <CardDescription>
          Enter your API key to enable AI features across the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              To use AI features (Advisor, Chat, Scenarios), you need to provide an API key. 
              This key will be stored locally on your device and not sent to our servers.
            </p>
            
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveApiKey} className="w-full">
                  Save API Key
                </Button>
                {isSaved && (
                  <Button onClick={handleClearApiKey} variant="outline" className="w-full">
                    Clear API Key
                  </Button>
                )}
              </div>
            </div>
            
            {isSaved && (
              <p className="text-sm text-green-600 mt-2">
                ✓ API key saved - AI features are enabled
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiSettings;
