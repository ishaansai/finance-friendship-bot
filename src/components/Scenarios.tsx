
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, RefreshCw, CheckCircle2, Lightbulb } from "lucide-react";

// Mock scenarios by category
const scenarioCategories = [
  {
    id: "budget",
    name: "Budgeting",
    description: "Test your budgeting skills in real-life situations",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "saving",
    name: "Saving",
    description: "Learn to make saving decisions in various scenarios",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "debt",
    name: "Debt Management",
    description: "Navigate complex debt scenarios and learn best practices",
    color: "bg-red-100 text-red-800",
  },
  {
    id: "invest",
    name: "Investing",
    description: "Practice making investment decisions with simulated scenarios",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "emergency",
    name: "Emergency Situations",
    description: "Learn how to handle unexpected financial emergencies",
    color: "bg-amber-100 text-amber-800",
  },
  {
    id: "retirement",
    name: "Retirement Planning",
    description: "Make choices that impact your long-term retirement goals",
    color: "bg-indigo-100 text-indigo-800",
  },
];

// Mock scenarios
const mockScenarios: Record<string, string[]> = {
  budget: [
    "You've just received a $2,000 bonus at work. You have $5,000 in credit card debt with 18% interest, a car payment, and you're also saving for a vacation. How would you allocate this money?",
    "Your monthly income is $4,000 after taxes. You're trying to create a budget for the first time. What categories would you include, and how would you allocate your income?",
    "You've been tracking your spending and notice you're spending $500 monthly on dining out, which is 20% of your take-home pay. Is this appropriate? What adjustments might you consider?",
  ],
  saving: [
    "You want to save $10,000 for a down payment on a house in two years. Your monthly income is $3,500 after taxes, and your monthly expenses are currently $3,000. How would you approach this goal?",
    "You're deciding between putting money in a high-yield savings account earning 2% interest or paying off a student loan with 4.5% interest. Which would you prioritize and why?",
    "You receive $200 cash as a gift. You have no emergency fund yet, but you also want to buy something you've been wanting for a while. What would you do with the money?",
  ],
  debt: [
    "You have multiple debts: $5,000 on a credit card with 22% interest, $15,000 in student loans at 5% interest, and $8,000 in car loans at 7% interest. You have $500 extra each month to put toward debt. How would you prioritize your payments?",
    "You're considering taking out a personal loan to consolidate your high-interest credit card debt. The loan would have a lower interest rate but would extend the payment period. What factors would you consider in making this decision?",
    "You've received a medical bill for $3,000 that you can't pay in full right now. What steps would you take to handle this situation?",
  ],
  invest: [
    "You have $10,000 to invest for the first time. You're 30 years old and saving for retirement. How would you allocate this money across different investment types?",
    "You've inherited $50,000 and are deciding between investing in the stock market, real estate, or paying off your mortgage early. What factors would influence your decision?",
    "The stock market has just dropped 20% in a month, and your investments have lost significant value. What would your next actions be?",
  ],
  emergency: [
    "Your car needs a $1,500 repair that you didn't anticipate. You don't have an emergency fund, but you do have a credit card with a 20% interest rate. How would you handle this situation?",
    "You've unexpectedly lost your job. You have one month's worth of expenses saved, and your monthly obligations total $3,000. What immediate steps would you take to manage this situation?",
    "A family member is facing a financial crisis and asks to borrow $2,000 from you. You have the money in your emergency fund. How would you approach this situation?",
  ],
  retirement: [
    "You're 25 years old and starting your first job with a 401(k) option. Your employer matches 100% of your contributions up to 4% of your salary. How would you approach your retirement savings?",
    "You're 45 and haven't saved much for retirement yet. Your annual income is $70,000. What strategies would you implement to catch up on retirement savings?",
    "You're considering retiring at age 62, but you would receive reduced Social Security benefits compared to waiting until age 67. What factors would you consider in making this decision?",
  ],
};

// Mock feedback for demonstration purposes
const mockFeedback: Record<string, Record<string, string>> = {
  excellent: {
    feedback: "Excellent thinking! Your approach demonstrates a strong understanding of financial principles.",
    advice: "You're on the right track with your financial decisions. Continue to apply these principles in your daily life."
  },
  good: {
    feedback: "Good approach! You've considered some important factors in your decision.",
    advice: "To further improve: consider long-term implications and prioritize based on interest rates when dealing with debt or investments."
  },
  fair: {
    feedback: "You're on the right track, but there are some opportunities for improvement.",
    advice: "When making financial decisions, remember to prioritize high-interest debt, maintain an emergency fund, and consider the time value of money."
  },
  needs_improvement: {
    feedback: "There are some gaps in your approach that could be improved.",
    advice: "A better approach would be to prioritize building emergency savings, then tackle high-interest debt before focusing on wants rather than needs."
  }
};

const Scenarios = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentScenario, setCurrentScenario] = useState<string | null>(null);
  const [userResponse, setUserResponse] = useState("");
  const [feedback, setFeedback] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    generateScenario(categoryId);
    setUserResponse("");
    setFeedback(null);
  };

  const generateScenario = (categoryId: string) => {
    const scenarios = mockScenarios[categoryId];
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    setCurrentScenario(scenarios[randomIndex]);
  };

  const handleSubmitResponse = () => {
    if (!userResponse.trim()) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would be determined by the AI
      const feedbackTypes = ["excellent", "good", "fair", "needs_improvement"];
      const randomFeedback = mockFeedback[feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)]];
      
      setFeedback(randomFeedback);
      setLoading(false);
    }, 1500);
  };

  const handleNewScenario = () => {
    if (selectedCategory) {
      generateScenario(selectedCategory);
      setUserResponse("");
      setFeedback(null);
    }
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
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Select a category to explore scenarios related to that financial topic.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {scenarioCategories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectCategory(category.id)}
                  className={`p-3 rounded-lg text-left transition-all ${
                    selectedCategory === category.id
                      ? "ring-2 ring-finance-blue"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Badge className={category.color + " mb-2"}>
                    {category.name}
                  </Badge>
                  <p className="text-xs text-gray-600">{category.description}</p>
                </motion.button>
              ))}
            </div>
            
            {selectedCategory && (
              <Button 
                onClick={handleNewScenario}
                variant="outline" 
                className="w-full mt-4"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate New Scenario
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="glass lg:col-span-2">
        <CardContent className="pt-6">
          {!selectedCategory ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Select a category to begin exploring financial scenarios
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <Badge className="mb-2">
                  {scenarioCategories.find(c => c.id === selectedCategory)?.name}
                </Badge>
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
                  onClick={handleSubmitResponse}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Scenarios;
