
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
      toast.error("No API key available");
      reject(new Error("No API key provided"));
      return;
    }

    // Analyze the user's response content to provide more targeted feedback
    // This is a simplified analysis for demonstration
    const responseWords = response.toLowerCase().split(/\s+/);
    
    // Check for keywords that might indicate good financial thinking
    const positiveKeywords = ['emergency', 'fund', 'budget', 'save', 'invest', 'prioritize', 'needs', 'long-term'];
    const negativeKeywords = ['spend', 'loan', 'borrow', 'credit', 'immediately', 'buy'];
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    responseWords.forEach(word => {
      if (positiveKeywords.includes(word)) positiveScore++;
      if (negativeKeywords.includes(word)) negativeScore++;
    });
    
    // Calculate a simple score based on positive vs negative financial concepts
    const score = positiveScore - negativeScore;
    
    // Determine feedback type based on score
    let feedbackType: string;
    
    if (score >= 3) {
      feedbackType = "excellent";
    } else if (score >= 1) {
      feedbackType = "good";
    } else if (score >= 0) {
      feedbackType = "fair";
    } else {
      feedbackType = "needs_improvement";
    }
    
    // Return the appropriate feedback
    setTimeout(() => {
      resolve(mockFeedback[feedbackType]);
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
