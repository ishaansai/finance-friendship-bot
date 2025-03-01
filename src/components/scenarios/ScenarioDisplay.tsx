
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Lightbulb } from "lucide-react";
import { ScenarioCategory, scenarioCategories } from "@/data/scenarioCategories";
import { FeedbackItem } from "@/data/mockFeedback";

interface ScenarioDisplayProps {
  selectedCategory: string | null;
  currentScenario: string | null;
  onSubmitResponse: (response: string) => void;
  feedback: FeedbackItem | null;
  loading: boolean;
}

const ScenarioDisplay = ({
  selectedCategory,
  currentScenario,
  onSubmitResponse,
  feedback,
  loading,
}: ScenarioDisplayProps) => {
  const [userResponse, setUserResponse] = useState("");
  
  const handleSubmit = () => {
    if (userResponse.trim()) {
      onSubmitResponse(userResponse);
    }
  };
  
  const categoryName = selectedCategory
    ? scenarioCategories.find(c => c.id === selectedCategory)?.name
    : "";
  
  if (!selectedCategory) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          Select a category to begin exploring financial scenarios
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <Badge className="mb-2">{categoryName}</Badge>
        <p className="text-lg font-medium">{currentScenario}</p>
      </div>

      <Separator />

      <div>
        <label className="block text-sm font-medium mb-2">
          What would you do in this situation?
        </label>
        <Textarea
          value={userResponse}
          onChange={(e) => setUserResponse(e.target.value)}
          placeholder="Type your response here..."
          className="min-h-[120px]"
        />
        <Button
          onClick={handleSubmit}
          className="mt-4 w-full"
          disabled={!userResponse.trim() || loading}
        >
          {loading ? (
            <>
              <span className="loader mr-2"></span>
              Analyzing your response...
            </>
          ) : (
            "Submit Response"
          )}
        </Button>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <Separator className="my-6" />
            
            <div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Feedback</h3>
                  <p className="text-gray-700 mt-1">{feedback.feedback}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 mt-4">
                <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Expert Advice</h3>
                  <p className="text-gray-700 mt-1">{feedback.advice}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScenarioDisplay;
