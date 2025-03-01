
import { mockScenarios } from "@/data/mockScenarios";
import { mockFeedback, FeedbackItem } from "@/data/mockFeedback";
import { toast } from "sonner";

export const generateScenario = (categoryId: string): string => {
  const scenarios = mockScenarios[categoryId];
  const randomIndex = Math.floor(Math.random() * scenarios.length);
  return scenarios[randomIndex];
};

export const getScenarioFeedback = (
  response: string,
  apiKey: string | null
): Promise<FeedbackItem> => {
  return new Promise((resolve, reject) => {
    if (!apiKey) {
      toast.error("Please add your API key in Settings to use this feature");
      reject(new Error("No API key provided"));
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const feedbackTypes = ["excellent", "good", "fair", "needs_improvement"];
      const randomFeedback = mockFeedback[feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)]];
      
      resolve(randomFeedback);
    }, 1500);
    
    /* 
    // Real API implementation would look like this:
    fetch('https://api.example.com/scenario-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        category: selectedCategory,
        scenario: currentScenario,
        userResponse: response
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to get feedback');
      }
      return response.json();
    })
    .then(data => resolve(data.feedback))
    .catch(error => reject(error));
    */
  });
};
