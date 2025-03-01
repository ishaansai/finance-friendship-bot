
export interface FeedbackItem {
  feedback: string;
  advice: string;
}

export const mockFeedback: Record<string, FeedbackItem> = {
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
