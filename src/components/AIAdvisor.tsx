
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Transaction } from "./ExpenseTracker";
import { useApiKey } from "@/hooks/useApiKey";

interface AIAdvisorProps {
  transactions: Transaction[];
}

const AIAdvisor = ({ transactions }: AIAdvisorProps) => {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { apiKey, checkApiKey } = useApiKey();

  // Generate advice automatically when component mounts or transactions change
  useEffect(() => {
    generateAdvice();
  }, [transactions]);

  const generateAdvice = async () => {
    // Check if there are enough transactions to generate meaningful advice
    if (transactions.length < 3) {
      setAdvice("");
      return;
    }

    // Check if API key is available
    if (!checkApiKey()) {
      return;
    }

    setLoading(true);
    
    try {
      // For now, we'll continue with the mock implementation
      // In a real app, this would be replaced with an actual API call using the apiKey
      
      setTimeout(() => {
        // Calculate financial metrics
        const income = transactions
          .filter(t => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);
        
        const expenses = transactions
          .filter(t => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);
        
        const balance = income - expenses;
        const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
        
        // Get expenses by category
        const expensesByCategory = transactions
          .filter(t => t.type === "expense")
          .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
          }, {} as Record<string, number>);
        
        // Sort categories by amount spent
        const topCategories = Object.entries(expensesByCategory)
          .sort((a, b) => b[1] - a[1]);
        
        // Identify recurring expenses (this is simplified - in a real app, you'd have more sophisticated analysis)
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        
        const recentTransactions = transactions
          .filter(t => new Date(t.date) > lastMonth)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        // Generate highly specific advice based on the data
        let adviceText = "";
        
        if (balance < 0) {
          adviceText = `You're currently spending more than you earn, which is a critical financial concern. `;
          adviceText += `Your expenses of $${expenses.toFixed(2)} exceed your income of $${income.toFixed(2)} by $${Math.abs(balance).toFixed(2)}. `;
          
          // Specific advice on top spending categories
          adviceText += `Your highest spending categories are: `;
          topCategories.slice(0, 3).forEach(([category, amount], index) => {
            const percentage = (amount / expenses) * 100;
            adviceText += `${category} ($${amount.toFixed(2)}, ${percentage.toFixed(1)}% of total expenses)`;
            if (index < 2 && topCategories.length > 1) adviceText += ", ";
          });
          adviceText += ". ";
          
          // Actionable steps
          adviceText += `I recommend immediately reducing discretionary spending in your top categories. `;
          
          if (topCategories.find(([cat]) => cat === "Entertainment" || cat === "Personal")) {
            adviceText += `Consider cutting back on Entertainment and Personal expenses first, as these are typically more flexible. `;
          }
          
          adviceText += `Aim to reduce your monthly expenses by at least $${Math.abs(balance).toFixed(2)} to break even. `;
          adviceText += `Additionally, look for ways to increase your income through side gigs or asking for a raise. `;
          adviceText += `Create a strict budget that prioritizes essential expenses like housing, utilities, and food.`;
        } else if (savingsRate < 20) {
          adviceText = `You're maintaining a positive balance, which is good, but your current savings rate of ${savingsRate.toFixed(1)}% is below the recommended 20%. `;
          adviceText += `Your income is $${income.toFixed(2)} and expenses are $${expenses.toFixed(2)}, giving you a balance of $${balance.toFixed(2)}. `;
          
          // Category-specific advice
          adviceText += `Looking at your spending patterns, I notice: `;
          
          // Find high-opportunity categories
          topCategories.slice(0, 3).forEach(([category, amount]) => {
            const percentage = (amount / expenses) * 100;
            if (category === "Food" && percentage > 15) {
              adviceText += `Your Food spending ($${amount.toFixed(2)}) makes up ${percentage.toFixed(1)}% of your expenses, which is relatively high. Consider meal planning and reducing dining out. `;
            } else if (category === "Entertainment" && percentage > 10) {
              adviceText += `Your Entertainment budget ($${amount.toFixed(2)}) is ${percentage.toFixed(1)}% of your expenses. Look for free or lower-cost alternatives for entertainment. `;
            } else if (category === "Personal" && percentage > 10) {
              adviceText += `Personal spending ($${amount.toFixed(2)}) accounts for ${percentage.toFixed(1)}% of your expenses. Evaluate if these purchases align with your financial goals. `;
            } else {
              adviceText += `${category} makes up ${percentage.toFixed(1)}% of your expenses at $${amount.toFixed(2)}. `;
            }
          });
          
          // Recommendations to increase savings rate
          adviceText += `To reach a 20% savings rate, you need to save an additional $${((0.2 * income) - balance).toFixed(2)} per month. `;
          adviceText += `I recommend creating specific savings goals, automating transfers to a savings account, and reviewing subscription services for potential cuts. `;
          adviceText += `Additionally, ensure you're contributing to retirement accounts, especially if your employer offers a match.`;
        } else {
          adviceText = `Excellent job! You're maintaining a healthy savings rate of ${savingsRate.toFixed(1)}%, above the recommended 20%. `;
          adviceText += `Your income is $${income.toFixed(2)} and expenses are $${expenses.toFixed(2)}, resulting in a positive balance of $${balance.toFixed(2)}. `;
          
          // Optimization advice
          adviceText += `While your overall financial health is good, here are some optimization suggestions: `;
          
          // Check if they have a lot in specific categories
          const hasHighHousing = !!topCategories.find(([cat, amount]) => cat === "Housing" && amount > 0.3 * expenses);
          const hasHighDebt = !!topCategories.find(([cat, amount]) => cat === "Debt" && amount > 0.15 * expenses);
          
          if (hasHighHousing) {
            adviceText += `Your housing costs are a significant portion of your budget. If feasible, consider ways to reduce this expense for even greater savings. `;
          }
          
          if (hasHighDebt) {
            adviceText += `You're spending considerably on debt payments. Prioritize high-interest debt and consider debt consolidation to reduce interest payments. `;
          }
          
          // Investment advice
          adviceText += `With your excellent savings rate, focus on optimizing your investments. Ensure you're maxing out tax-advantaged accounts like 401(k)s and IRAs. `;
          adviceText += `Consider diversifying your investments across different asset classes based on your risk tolerance and time horizon. `;
          adviceText += `You might also want to build a more robust emergency fund (6-12 months of expenses) if you haven't already, and consider medium-term financial goals like property investment or education funding.`;
        }
        
        setAdvice(adviceText);
        setLoading(false);
      }, 1500);

      // Example of how a real API call would work:
      /*
      const response = await fetch('https://api.example.com/financial-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          transactions: transactions,
          analysisType: 'comprehensive_financial_advice'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get advice');
      }

      const data = await response.json();
      setAdvice(data.advice);
      setLoading(false);
      */
      
    } catch (error) {
      console.error('Error generating advice:', error);
      toast.error("Failed to generate advice. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
          Financial Advisor
        </CardTitle>
        <CardDescription>
          Personalized financial advice based on your transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length < 3 ? (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <p className="text-finance-gray">
                Add at least 3 transactions in the Expense Tracker to get personalized advice
              </p>
            </div>
          ) : loading ? (
            <div className="text-center p-6">
              <span className="loader mr-2"></span>
              <p className="text-finance-gray mt-2">Analyzing your finances...</p>
            </div>
          ) : (
            advice && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-finance-blue/5 rounded-lg"
              >
                <p className="text-finance-charcoal leading-relaxed">{advice}</p>
              </motion.div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAdvisor;
