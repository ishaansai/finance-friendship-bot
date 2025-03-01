
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

    console.log(`Using API key: ${apiKey.substring(0, 5)}... for scenario analysis`);
    
    // Analyze the user's response content to provide more targeted feedback
    const responseWords = response.toLowerCase().split(/\s+/);
    
    // Enhanced keyword lists for better analysis
    const positiveKeywords = [
      'emergency', 'fund', 'budget', 'save', 'invest', 'prioritize', 'needs', 
      'long-term', 'retirement', 'planning', 'diversify', 'research', 'debt-free',
      'balance', 'savings', 'goals', 'conservative', 'rational', 'responsible'
    ];
    
    const negativeKeywords = [
      'spend', 'loan', 'borrow', 'credit', 'immediately', 'buy', 'quick',
      'impulse', 'gamble', 'risk', 'debt', 'expensive', 'lottery', 'chance',
      'easy', 'shortcut', 'overnight', 'get-rich-quick'
    ];
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    // More sophisticated analysis
    responseWords.forEach(word => {
      if (positiveKeywords.includes(word)) positiveScore += 2;
      if (negativeKeywords.includes(word)) negativeScore += 2;
    });
    
    // Look for phrases (more valuable than single words)
    const phrases = [
      { text: "emergency fund", score: 5, type: "positive" },
      { text: "retirement plan", score: 5, type: "positive" },
      { text: "financial goals", score: 4, type: "positive" },
      { text: "budget planning", score: 4, type: "positive" },
      { text: "debt free", score: 3, type: "positive" },
      { text: "long term investment", score: 4, type: "positive" },
      { text: "quick money", score: -3, type: "negative" },
      { text: "credit card debt", score: -3, type: "negative" },
      { text: "payday loan", score: -4, type: "negative" },
      { text: "get rich quick", score: -5, type: "negative" },
    ];
    
    phrases.forEach(phrase => {
      if (response.toLowerCase().includes(phrase.text)) {
        if (phrase.type === "positive") {
          positiveScore += phrase.score;
        } else {
          negativeScore += phrase.score;
        }
      }
    });
    
    // Response length is also factored (thoughtful responses tend to be longer)
    if (response.length > 300) positiveScore += 2;
    if (response.length > 500) positiveScore += 3;
    if (response.length < 100) negativeScore += 2;
    
    // Calculate a comprehensive score
    const score = positiveScore - negativeScore;
    console.log(`Analysis score: ${score} (Positive: ${positiveScore}, Negative: ${negativeScore})`);
    
    // Determine feedback type based on score
    let feedbackType: string;
    
    if (score >= 10) {
      feedbackType = "excellent";
    } else if (score >= 5) {
      feedbackType = "good";
    } else if (score >= 0) {
      feedbackType = "fair";
    } else {
      feedbackType = "needs_improvement";
    }
    
    console.log(`Selected feedback type: ${feedbackType}`);
    
    // Return the appropriate feedback with a short delay to simulate API call
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
        userResponse: response,
        analysisType: 'financial_decision_making'
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
