
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
        // Calculate some basic financial metrics
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
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);
        
        // Generate advice based on the data
        let adviceText = "";
        
        if (balance < 0) {
          adviceText = "Your expenses are exceeding your income, which is a concern. ";
          adviceText += "Consider reducing spending in your top categories: " + 
            topCategories.map(([cat, amount]) => `${cat} ($${amount.toFixed(2)})`).join(", ") + ". ";
          adviceText += "Try to establish a budget that keeps your expenses below your income.";
        } else if (savingsRate < 20) {
          adviceText = "You're keeping a positive balance, which is good! ";
          adviceText += "However, financial experts often recommend saving at least 20% of your income. ";
          adviceText += "Your current savings rate is " + savingsRate.toFixed(1) + "%. ";
          adviceText += "Consider reducing expenses in your highest spending categories: " + 
            topCategories.map(([cat, amount]) => `${cat} ($${amount.toFixed(2)})`).join(", ") + ".";
        } else {
          adviceText = "Great job! You're maintaining a healthy savings rate of " + savingsRate.toFixed(1) + "%. ";
          adviceText += "Your top spending categories are: " + 
            topCategories.map(([cat, amount]) => `${cat} ($${amount.toFixed(2)})`).join(", ") + ". ";
          adviceText += "Consider investing your savings for long-term growth or building an emergency fund if you haven't already.";
        }
        
        setAdvice(adviceText);
        setLoading(false);
      }, 1500);

      // Example of how you would make an actual API call:
      /*
      const response = await fetch('https://api.example.com/financial-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          transactions: transactions,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get advice');
      }

      const data = await response.json();
      setAdvice(data.advice);
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
