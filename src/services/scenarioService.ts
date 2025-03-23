
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
    
    // In a real implementation, we would call the AI API here
    // For now, let's simulate a more sophisticated analysis
    
    // Extract key financial concepts and themes from the response
    const responseText = response.toLowerCase();
    
    // Analyze for specific financial concepts
    const emergencyFundMentioned = responseText.includes("emergency fund") || responseText.includes("emergency savings");
    const debtStrategyMentioned = responseText.includes("high interest") || responseText.includes("debt snowball") || responseText.includes("debt avalanche");
    const budgetingMentioned = responseText.includes("budget") || responseText.includes("tracking expenses");
    const investmentMentioned = responseText.includes("invest") || responseText.includes("stock") || responseText.includes("401k");
    const needsVsWantsMentioned = responseText.includes("needs vs wants") || responseText.includes("necessities") || responseText.includes("priorities");
    const savingMentioned = responseText.includes("save") || responseText.includes("saving");
    
    // Calculate a score based on financial literacy concepts
    let score = 0;
    let feedbackPoints = [];
    let advicePoints = [];
    
    if (emergencyFundMentioned) {
      score += 3;
      feedbackPoints.push("You correctly emphasized the importance of emergency savings");
    } else {
      advicePoints.push("Consider building an emergency fund of 3-6 months of expenses before other financial goals");
    }
    
    if (debtStrategyMentioned) {
      score += 3;
      feedbackPoints.push("Your strategic approach to debt management shows financial acumen");
    } else {
      advicePoints.push("Prioritize high-interest debt using either the snowball (psychological wins) or avalanche (mathematical efficiency) method");
    }
    
    if (budgetingMentioned) {
      score += 2;
      feedbackPoints.push("Your mention of budgeting demonstrates foundational financial understanding");
    } else {
      advicePoints.push("Track your expenses and create a budget as the foundation of financial success");
    }
    
    if (needsVsWantsMentioned) {
      score += 2;
      feedbackPoints.push("Distinguishing between needs and wants shows practical financial wisdom");
    } else {
      advicePoints.push("Differentiate between needs and wants in your spending decisions");
    }
    
    if (savingMentioned) {
      score += 2;
      feedbackPoints.push("Your focus on saving is essential for financial stability");
    }
    
    if (investmentMentioned && score < 7) {
      advicePoints.push("Focus on emergency savings and debt before advancing to complex investments");
    } else if (investmentMentioned) {
      score += 2;
      feedbackPoints.push("Your forward-thinking about investments shows advanced financial planning");
    }
    
    // Analyze response comprehensiveness and depth
    const wordCount = response.split(' ').length;
    if (wordCount > 100) score += 2;
    if (wordCount > 200) score += 1;
    
    // Generate personalized feedback
    let feedback = "";
    let advice = "";
    
    if (score >= 10) {
      feedback = "Excellent financial reasoning! " + feedbackPoints.join(". ") + ".";
      advice = "To further enhance your financial strategy: " + (advicePoints.length > 0 ? advicePoints.join(". ") : "Consider exploring tax-advantaged investment vehicles and asset allocation strategies based on your time horizon.");
    } else if (score >= 7) {
      feedback = "Good financial thinking! " + feedbackPoints.join(". ") + ".";
      advice = "To improve your approach: " + advicePoints.join(". ") + ".";
    } else if (score >= 4) {
      feedback = "You're on the right track with some good financial concepts. " + (feedbackPoints.length > 0 ? feedbackPoints.join(". ") + "." : "");
      advice = "Focus on these fundamental principles: " + advicePoints.join(". ") + ".";
    } else {
      feedback = "There's room for improvement in your financial approach.";
      advice = "Start with these financial basics: build an emergency fund of 3-6 months of expenses, create and follow a budget, distinguish between needs and wants, and tackle high-interest debt. These fundamentals will set you up for financial success.";
    }

    console.log(`Analysis scores: Knowledge=${score}, Total=${score}`);
    
    // Create custom feedback based on the analysis
    let customFeedback: FeedbackItem = {
      feedback: feedback,
      advice: advice
    };
    
    // In a real app, we would use the API key to call the API here
    setTimeout(() => {
      resolve(customFeedback);
    }, 1500);
  });
};
