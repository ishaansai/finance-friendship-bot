

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useApiKey } from "@/hooks/useApiKey";
import ScenarioCategories from "@/components/scenarios/ScenarioCategories";
import ScenarioDisplay from "@/components/scenarios/ScenarioDisplay";
import { generateScenario, getScenarioFeedback } from "@/services/scenarioService";
import { FeedbackItem } from "@/data/mockFeedback";

const Scenarios = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentScenario, setCurrentScenario] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackItem | null>(null);
  const [loading, setLoading] = useState(false);
  const { apiKey, checkApiKey } = useApiKey();

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    handleNewScenario(categoryId);
    setFeedback(null);
  };

  const handleNewScenario = (categoryId?: string) => {
    const category = categoryId || selectedCategory;
    if (!category || !checkApiKey()) return;
    
    const scenario = generateScenario(category);
    setCurrentScenario(scenario);
    setFeedback(null);
  };

  const handleSubmitResponse = (userResponse: string) => {
    if (!checkApiKey()) return;
    
    setLoading(true);
    
    getScenarioFeedback(userResponse, apiKey)
      .then(feedbackData => {
        setFeedback(feedbackData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error getting feedback:', error);
        toast.error("Failed to analyze response. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="glass lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-finance-indigo" />
            Financial Scenarios
          </CardTitle>
          <CardDescription>
            Test your knowledge with real-life financial scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScenarioCategories 
            selectedCategory={selectedCategory}
            onSelectCategory={selectCategory}
            onNewScenario={() => handleNewScenario()}
          />
        </CardContent>
      </Card>

      <Card className="glass lg:col-span-2">
        <CardContent className="pt-6">
          <ScenarioDisplay
            selectedCategory={selectedCategory}
            currentScenario={currentScenario}
            onSubmitResponse={handleSubmitResponse}
            feedback={feedback}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Scenarios;
