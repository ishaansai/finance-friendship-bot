
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Info, CheckCircle2 } from "lucide-react";
import { useApiKey } from "@/hooks/useApiKey";

const ApiSettings = () => {
  const { apiKey } = useApiKey();

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <KeyRound className="h-5 w-5 mr-2 text-finance-blue" />
          API Settings
        </CardTitle>
        <CardDescription>
          API key is pre-configured and ready to use
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start p-3 bg-green-50 rounded-md text-green-700">
            <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">API Key Status: Active</p>
              <p>All AI features are enabled and ready to use. The API key has been pre-configured by the application owner.</p>
              <p className="mt-1">You don't need to provide your own API key.</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 rounded-md text-blue-700">
              <Info className="h-5 w-5 mr-2 inline-block" />
              <span className="text-sm font-medium">Important Note:</span>
              <p className="text-sm mt-1">
                This application uses a shared API key for all users. The key is managed by the application owner 
                and you do not need to make any changes here.
              </p>
            </div>
            
            <p className="text-sm text-green-600 mt-2 text-center">
              ✓ All AI features are enabled and working
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiSettings;
