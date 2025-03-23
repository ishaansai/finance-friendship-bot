
// Mock responses - these would be replaced with actual API calls in production
const mockResponses: Record<string, string> = {
  "default": "I'd be happy to help with your financial questions. What would you like to know about?",
  "emergency fund": "An emergency fund is a financial safety net that everyone should have. Aim to save 3-6 months of essential expenses in an easily accessible account.",
  "investing": "Investing is putting money into financial products with the hope of growing your wealth. Common investment options include stocks, bonds, real estate, and index funds.",
  "credit score": "Your credit score is a number between 300-850 that represents your creditworthiness. Factors that affect it include payment history, amounts owed, length of credit history, new credit, and credit mix.",
  "budget": "A budget is a plan for your money. Start by tracking your income and expenses, then allocate funds to needs, wants, and savings. The 50/30/20 rule suggests spending 50% on needs, 30% on wants, and saving 20%.",
  "debt": "Not all debt is bad, but high-interest debt like credit cards should be prioritized for payoff. Consider strategies like the avalanche method (paying highest interest first) or the snowball method (paying smallest balances first).",
  "retirement": "Start saving for retirement as early as possible to benefit from compound interest. Common retirement accounts include 401(k)s, IRAs, and Roth IRAs, which offer tax advantages."
};

export const findBestResponse = (query: string): string => {
  query = query.toLowerCase();
  
  for (const [keyword, response] of Object.entries(mockResponses)) {
    if (query.includes(keyword.toLowerCase())) {
      return response;
    }
  }
  
  return mockResponses.default;
};
