

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { useApiKey } from "@/hooks/useApiKey";

const ApiSettings = () => {
  const { apiKey, isCustomKey, isLoading, saveApiKey, clearApiKey } = useApiKey();
  const [inputKey, setInputKey] = useState("");

  const handleSaveKey = () => {
    saveApiKey(inputKey);
    setInputKey("");
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <KeyRound className="h-5 w-5 mr-2 text-finance-blue" />
          API Settings
        </CardTitle>
        <CardDescription>
          Configure your AI API key to enable advanced features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isCustomKey ? (
            <div className="flex items-start p-3 bg-green-50 rounded-md text-green-700">
              <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">API Key Status: Active</p>
                <p>All AI features are enabled and ready to use.</p>
                <p className="mt-1">Your API key is securely stored in your browser.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start p-3 bg-amber-50 rounded-md text-amber-700">
              <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">API Key Status: Not Configured</p>
                <p>Please add your API key to enable all AI features.</p>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 rounded-md text-blue-700">
              <Info className="h-5 w-5 mr-2 inline-block" />
              <span className="text-sm font-medium">Important Note:</span>
              <p className="text-sm mt-1">
                Your API key is stored locally in your browser and is never sent to our servers.
                You can get an API key from the OpenAI website or other AI service providers.
              </p>
            </div>
            
            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium">
                {isCustomKey ? "Update API Key" : "Enter Your API Key"}
              </label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Enter your API key here"
                  className="flex-grow"
                />
                <Button 
                  onClick={handleSaveKey} 
                  disabled={!inputKey.trim() || isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </div>
              
              {isCustomKey && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearApiKey}
                  className="mt-2"
                >
                  Remove API Key
                </Button>
              )}
            </div>
            
            <p className={`text-sm text-center mt-4 ${isCustomKey ? "text-green-600" : "text-gray-500"}`}>
              {isCustomKey 
                ? "✓ All AI features are enabled and working" 
                : "Enter your API key to enable all AI features"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiSettings;
