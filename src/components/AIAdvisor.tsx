
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Transaction } from "./ExpenseTracker";

interface AIAdvisorProps {
  transactions: Transaction[];
}

const AIAdvisor = ({ transactions }: AIAdvisorProps) => {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const generateAdvice = () => {
    // Check if there are enough transactions to generate meaningful advice
    if (transactions.length < 3) {
      toast.error("Please add more transactions to get personalized advice");
      return;
    }

    setLoading(true);
    
    // Mock API call - in a real app, this would be replaced with an actual API call
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
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
          Financial Advisor
        </CardTitle>
        <CardDescription>
          Get personalized financial advice based on your transactions
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
          ) : (
            <Button 
              onClick={generateAdvice} 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loader mr-2"></span>
                  Analyzing your finances...
                </>
              ) : (
                "Generate Advice"
              )}
            </Button>
          )}

          {advice && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-finance-blue/5 rounded-lg"
            >
              <p className="text-finance-charcoal leading-relaxed">{advice}</p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAdvisor;
