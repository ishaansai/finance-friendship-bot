
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
      toast.error("No API key available. Please configure it in Settings.");
      reject(new Error("No API key provided"));
      return;
    }

    console.log(`Using API key: ${apiKey.substring(0, 5)}... for scenario analysis`);
    
    // Analyze the user's response to provide detailed, educational feedback
    // In a real app, this would be done by the AI API
    const responseWords = response.toLowerCase().split(/\s+/);
    
    // Enhanced keyword analysis system for deeper financial knowledge assessment
    const keywordCategories = {
      emergencyFund: ["emergency", "fund", "safety", "net", "unexpected", "rainy", "day", "buffer"],
      budgeting: ["budget", "track", "planning", "allocate", "needs", "wants", "spending", "plan"],
      debtManagement: ["debt", "interest", "principal", "avalanche", "snowball", "minimum", "payment", "consolidation"],
      investing: ["invest", "stock", "bond", "mutual", "fund", "index", "etf", "diversify", "portfolio", "risk"],
      retirement: ["retire", "401k", "ira", "roth", "pension", "compound", "interest", "social", "security"],
      taxStrategy: ["tax", "deduction", "credit", "defer", "bracket", "capital", "gain", "loss"],
      insurance: ["insure", "policy", "premium", "coverage", "risk", "liability", "term", "whole", "life"],
      estateWill: ["estate", "will", "trust", "beneficiary", "inheritance", "probate", "power", "attorney"]
    };
    
    // Comprehensive scoring system for financial knowledge
    const categoryScores: Record<string, number> = {};
    
    // Initialize scores
    Object.keys(keywordCategories).forEach(category => {
      categoryScores[category] = 0;
    });
    
    // Score each category based on keywords
    responseWords.forEach(word => {
      Object.entries(keywordCategories).forEach(([category, keywords]) => {
        if (keywords.includes(word)) {
          categoryScores[category] += 1;
        }
      });
    });
    
    // Check for financial concepts in response
    const financialConcepts = [
      { text: "emergency fund", category: "emergencyFund", score: 5 },
      { text: "three to six months", category: "emergencyFund", score: 3 },
      { text: "high-yield savings", category: "emergencyFund", score: 3 },
      { text: "debt to income ratio", category: "debtManagement", score: 4 },
      { text: "avalanche method", category: "debtManagement", score: 4 },
      { text: "snowball method", category: "debtManagement", score: 4 },
      { text: "compound interest", category: "investing", score: 4 },
      { text: "dollar cost averaging", category: "investing", score: 5 },
      { text: "diversification", category: "investing", score: 4 },
      { text: "asset allocation", category: "investing", score: 5 },
      { text: "tax-advantaged", category: "taxStrategy", score: 4 },
      { text: "capital gains", category: "taxStrategy", score: 3 },
      { text: "employer match", category: "retirement", score: 3 },
      { text: "roth conversion", category: "retirement", score: 5 },
      { text: "50/30/20 rule", category: "budgeting", score: 4 },
      { text: "zero-based budget", category: "budgeting", score: 4 },
      { text: "envelope system", category: "budgeting", score: 3 },
      { text: "term life insurance", category: "insurance", score: 3 },
      { text: "disability insurance", category: "insurance", score: 3 },
      { text: "living will", category: "estateWill", score: 3 },
    ];
    
    // Add scores for financial concepts
    financialConcepts.forEach(concept => {
      if (response.toLowerCase().includes(concept.text)) {
        categoryScores[concept.category] += concept.score;
      }
    });
    
    // Check for misunderstandings or misconceptions
    const misconceptions = [
      { text: "guaranteed return", penalty: 3 },
      { text: "get rich quick", penalty: 4 },
      { text: "timing the market", penalty: 3 },
      { text: "all debt is bad", penalty: 2 },
      { text: "i don't need insurance", penalty: 3 },
      { text: "social security will be enough", penalty: 3 },
      { text: "payday loan", penalty: 3 },
      { text: "cash advance", penalty: 2 },
    ];
    
    let misconceptionPenalty = 0;
    misconceptions.forEach(item => {
      if (response.toLowerCase().includes(item.text)) {
        misconceptionPenalty += item.penalty;
      }
    });
    
    // Calculate overall financial knowledge score
    const knowledgeScore = Object.values(categoryScores).reduce((sum, score) => sum + score, 0) - misconceptionPenalty;
    
    // Factor in response depth and clarity
    let complexityBonus = 0;
    if (response.length > 300) complexityBonus += 2;
    if (response.length > 500) complexityBonus += 3;
    
    // Look for structured thinking (paragraphs, numbered points, etc.)
    if (/\d\.\s/.test(response) || response.includes("\n\n")) {
      complexityBonus += 2;
    }
    
    // Calculate comprehensive score
    const totalScore = knowledgeScore + complexityBonus;
    console.log(`Analysis scores: Knowledge=${knowledgeScore}, Complexity=${complexityBonus}, Total=${totalScore}`);
    
    // Determine feedback type based on comprehensive analysis
    let feedbackType: string;
    
    if (totalScore >= 15) {
      feedbackType = "excellent";
    } else if (totalScore >= 8) {
      feedbackType = "good";
    } else if (totalScore >= 3) {
      feedbackType = "fair";
    } else {
      feedbackType = "needs_improvement";
    }
    
    console.log(`Selected feedback type: ${feedbackType}`);
    
    // Generate personalized feedback and educational guidance
    // In a real app, this would be generated by an AI API call
    setTimeout(() => {
      // Create custom feedback based on the analysis
      let customFeedback: FeedbackItem = {
        feedback: "",
        advice: ""
      };
      
      // Base feedback on template but with personalization
      const baseFeedback = mockFeedback[feedbackType];
      
      // Personalize feedback based on analysis
      switch (feedbackType) {
        case "excellent":
          customFeedback.feedback = `${baseFeedback.feedback} I'm impressed by your understanding of ${Object.entries(categoryScores).sort((a, b) => b[1] - a[1])[0][0]} concepts.`;
          customFeedback.advice = `${baseFeedback.advice} To further enhance your knowledge, consider exploring more advanced topics in ${Object.entries(categoryScores).sort((a, b) => a[1] - b[1])[0][0]}.`;
          break;
          
        case "good":
          customFeedback.feedback = `${baseFeedback.feedback} Your grasp of ${Object.entries(categoryScores).sort((a, b) => b[1] - a[1])[0][0]} principles is particularly strong.`;
          customFeedback.advice = `${baseFeedback.advice} To improve further, I recommend learning more about ${Object.entries(categoryScores).sort((a, b) => a[1] - b[1])[0][0]} concepts.`;
          break;
          
        case "fair":
          customFeedback.feedback = `${baseFeedback.feedback} You have some understanding of basic financial concepts.`;
          customFeedback.advice = `${baseFeedback.advice} Focus on strengthening your knowledge of ${Object.entries(categoryScores).sort((a, b) => a[1] - b[1])[0][0]} and ${Object.entries(categoryScores).sort((a, b) => a[1] - b[1])[1][0]}, which are foundational for financial success.`;
          break;
          
        case "needs_improvement":
          customFeedback.feedback = `${baseFeedback.feedback} Financial concepts can be complex, but understanding them is crucial for your financial well-being.`;
          customFeedback.advice = `${baseFeedback.advice} I recommend starting with the basics of budgeting and emergency funds. Consider resources like "Personal Finance for Dummies" or free courses from Khan Academy.`;
          break;
      }
      
      // Add educational tips based on misconceptions if detected
      if (misconceptionPenalty > 0) {
        customFeedback.advice += " Be careful about common financial misconceptions. Remember that sustainable wealth building is typically a gradual process based on consistent principles, not quick schemes.";
      }
      
      resolve(customFeedback);
    }, 1500);
    
    /* Real API implementation would look like this:
    fetch('https://api.example.com/scenario-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        userResponse: response,
        analysisType: 'financial_education',
        detailed: true,
        returnPersonalizedAdvice: true
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
