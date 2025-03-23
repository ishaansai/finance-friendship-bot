
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
        
        // Identify the top 3 expense categories
        const top3Categories = topCategories.slice(0, 3);
        
        // Calculate category percentages
        const categoryPercentages = top3Categories.map(([category, amount]) => ({
          category,
          amount,
          percentage: (amount / expenses) * 100
        }));
        
        // Find unusual spending patterns
        const highPercentageCategories = categoryPercentages.filter(cat => cat.percentage > 30);
        
        // Check for recent large transactions
        const recentTransactions = [...transactions]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
        
        const largeTransactions = recentTransactions.filter(t => 
          t.type === "expense" && t.amount > (expenses / transactions.filter(tr => tr.type === "expense").length) * 2
        );
        
        // Check income consistency
        const incomeTransactions = transactions.filter(t => t.type === "income");
        const hasRegularIncome = incomeTransactions.length >= 2;
        
        // Generate highly personalized advice
        let adviceText = "";
        
        // Financial health overview
        adviceText += `Based on your ${transactions.length} transactions, here's my analysis:\n\n`;
        
        if (balance < 0) {
          adviceText += `🚨 **URGENT FINANCIAL CONCERN**: You're spending more than you earn. Your expenses ($${expenses.toFixed(2)}) exceed your income ($${income.toFixed(2)}) by $${Math.abs(balance).toFixed(2)}.\n\n`;
          
          // Specific category recommendations for deficit
          adviceText += `Your top expense categories are:\n`;
          categoryPercentages.forEach(({category, amount, percentage}) => {
            adviceText += `- ${category}: $${amount.toFixed(2)} (${percentage.toFixed(1)}% of total expenses)\n`;
          });
          
          // Actionable advice based on specific categories
          if (highPercentageCategories.length > 0) {
            adviceText += `\nI recommend immediately reducing spending in ${highPercentageCategories.map(c => c.category).join(", ")}, which `;
            adviceText += highPercentageCategories.length === 1 ? "is taking" : "are taking";
            adviceText += ` up a disproportionate amount of your budget.\n`;
          }
          
          if (largeTransactions.length > 0) {
            adviceText += `\nYou've had ${largeTransactions.length} unusually large recent expenses. Try to avoid these types of expenses while your budget is in deficit.\n`;
          }
          
          // Specific action plan
          adviceText += `\n**Action plan to fix your deficit of $${Math.abs(balance).toFixed(2)}:**\n`;
          adviceText += `1. Cut all non-essential spending in ${categoryPercentages.find(c => c.category === "Entertainment" || c.category === "Personal")?.category || "discretionary categories"}\n`;
          adviceText += `2. Reduce spending in your top category (${categoryPercentages[0].category}) by at least ${Math.min(30, Math.ceil((Math.abs(balance) / categoryPercentages[0].amount) * 100)).toFixed(0)}%\n`;
          adviceText += `3. Look for additional income sources\n`;
          adviceText += `4. Create a strict zero-based budget where every dollar is assigned a purpose\n`;
        } 
        else if (savingsRate < 20) {
          adviceText += `Your financial situation is stable but could be improved. Your current savings rate is ${savingsRate.toFixed(1)}%, below the recommended 20%.\n\n`;
          
          // Category-specific advice
          adviceText += `Your top expense categories are:\n`;
          categoryPercentages.forEach(({category, amount, percentage}) => {
            adviceText += `- ${category}: $${amount.toFixed(2)} (${percentage.toFixed(1)}% of expenses)\n`;
            
            // Category-specific tips
            if (category === "Food" && percentage > 15) {
              adviceText += `  💡 Your food spending is relatively high. Consider meal planning and reducing dining out.\n`;
            } else if (category === "Entertainment" && percentage > 10) {
              adviceText += `  💡 Look for free or lower-cost entertainment alternatives.\n`;
            } else if (category === "Personal" && percentage > 10) {
              adviceText += `  💡 Consider if all personal expenses align with your financial goals.\n`;
            }
          });
          
          // Personalized savings goal
          const targetSavings = income * 0.2;
          const additionalSavingsNeeded = targetSavings - balance;
          
          adviceText += `\n**To reach a healthy 20% savings rate, you need to save an additional $${additionalSavingsNeeded.toFixed(2)} monthly.**\n\n`;
          adviceText += `Recommended actions:\n`;
          adviceText += `1. Set up automatic transfers of $${(balance + (additionalSavingsNeeded / 2)).toFixed(2)} to savings at the start of each pay period\n`;
          adviceText += `2. Review subscription services - are you getting value from all of them?\n`;
          adviceText += `3. Target reducing your ${categoryPercentages[0].category} expenses by ${Math.min(20, Math.ceil((additionalSavingsNeeded / categoryPercentages[0].amount) * 100)).toFixed(0)}%\n`;
          
          if (!hasRegularIncome) {
            adviceText += `4. Your income appears irregular. Consider building a larger emergency fund of 6-12 months expenses.\n`;
          } else {
            adviceText += `4. Ensure you're contributing to retirement accounts, especially if your employer offers a match\n`;
          }
        } 
        else {
          adviceText += `🌟 **Excellent job!** You're maintaining a healthy savings rate of ${savingsRate.toFixed(1)}%, above the recommended 20%.\n\n`;
          
          // Optimization advice
          adviceText += `Your top expense categories are:\n`;
          categoryPercentages.forEach(({category, amount, percentage}) => {
            adviceText += `- ${category}: $${amount.toFixed(2)} (${percentage.toFixed(1)}% of expenses)\n`;
          });
          
          // Check for optimization opportunities
          let optimizationTips = [];
          
          const hasHighHousing = categoryPercentages.some(c => c.category === "Housing" && c.percentage > 30);
          const hasHighDebt = categoryPercentages.some(c => c.category === "Debt" && c.percentage > 15);
          
          if (hasHighHousing) {
            optimizationTips.push("Your housing costs are a significant portion of your budget. Consider if there are ways to reduce this expense for even greater savings.");
          }
          
          if (hasHighDebt) {
            optimizationTips.push("You're spending considerably on debt payments. Focus on high-interest debt first and consider consolidation options to reduce interest.");
          }
          
          if (topCategories.length <= 3) {
            optimizationTips.push("Your expenses are concentrated in few categories, which is good for budgeting simplicity.");
          } else if (topCategories.length >= 7) {
            optimizationTips.push("Your spending is spread across many categories. Consider simplifying your budget for better tracking.");
          }
          
          if (optimizationTips.length > 0) {
            adviceText += `\n**Optimization opportunities:**\n`;
            optimizationTips.forEach((tip, i) => adviceText += `${i+1}. ${tip}\n`);
          }
          
          // Investment advice based on strong savings
          adviceText += `\n**Next level financial strategies:**\n`;
          adviceText += `1. Make sure you're maxing out tax-advantaged accounts like 401(k)s and IRAs\n`;
          adviceText += `2. Consider diversifying investments across different asset classes based on your risk tolerance\n`;
          adviceText += `3. Build a robust emergency fund (6-12 months of expenses) if not already in place\n`;
          adviceText += `4. Consider medium-term financial goals like property investment or education funding\n`;
          
          if (savingsRate > 40) {
            adviceText += `5. With your exceptional savings rate of ${savingsRate.toFixed(1)}%, you might be on a path to early retirement or financial independence. Consider resources like the FIRE movement (Financial Independence, Retire Early).\n`;
          }
        }
        
        setAdvice(adviceText);
        setLoading(false);
      }, 1500);
      
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
                <div className="text-finance-charcoal leading-relaxed whitespace-pre-line">
                  {advice.split('\n').map((line, i) => {
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return <h3 key={i} className="font-bold my-2">{line.replace(/\*\*/g, '')}</h3>;
                    } else if (line.startsWith("- ")) {
                      return <p key={i} className="ml-4 my-1">• {line.substring(2)}</p>;
                    } else if (line.match(/^\d+\./)) {
                      return <p key={i} className="ml-4 my-1">{line}</p>;
                    } else if (line.startsWith("🚨") || line.startsWith("🌟") || line.startsWith("💡")) {
                      return <p key={i} className="my-2 font-medium">{line}</p>;
                    } else if (line === "") {
                      return <br key={i} />;
                    } else {
                      return <p key={i} className="my-1">{line}</p>;
                    }
                  })}
                </div>
              </motion.div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAdvisor;
