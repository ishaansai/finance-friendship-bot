import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { PlusCircle, MinusCircle, DollarSign, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import ExpenseChart from "./charts/ExpenseChart";
import { formatCurrency } from "@/utils/financeUtils";
import { useFinance } from "@/context/FinanceContext";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

const categories = [
  "Housing", "Transportation", "Food", "Utilities", 
  "Insurance", "Healthcare", "Savings", "Personal", 
  "Entertainment", "Debt", "Education", "Other"
];

const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("Other");
  const { transactions, addTransaction, deleteTransaction } = useFinance();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || Number(amount) <= 0) {
      toast.error("Please provide a valid description and amount");
      return;
    }

    addTransaction({
      description,
      amount: Number(amount),
      type,
      category,
    });

    setDescription("");
    setAmount("");
    
    toast.success(`${type === "income" ? "Income" : "Expense"} added successfully`);
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
    toast.success("Transaction deleted");
  };

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = income - expenses;

  // Prepare data for chart
  const expensesByCategory = categories.map(category => {
    const amount = transactions
      .filter(t => t.type === "expense" && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
    return { category, amount };
  }).filter(item => item.amount > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="glass lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Add Transaction</CardTitle>
          <CardDescription>Record your income and expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Transaction Type</Label>
              <div className="flex rounded-md overflow-hidden">
                <Button
                  type="button"
                  onClick={() => setType("income")}
                  variant="ghost"
                  className={`flex-1 rounded-none ${
                    type === "income"
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : ""
                  }`}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Income
                </Button>
                <Button
                  type="button"
                  onClick={() => setType("expense")}
                  variant="ghost"
                  className={`flex-1 rounded-none ${
                    type === "expense"
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : ""
                  }`}
                >
                  <MinusCircle className="mr-2 h-4 w-4" />
                  Expense
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What was this for?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-10"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {type === "expense" && (
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button type="submit" className="w-full">
              Add Transaction
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="glass lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Financial Summary</CardTitle>
          <CardDescription>Overview of your finances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-green-50 p-4 rounded-lg text-center"
            >
              <p className="text-sm font-medium text-green-800 mb-1">Income</p>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(income)}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-red-50 p-4 rounded-lg text-center"
            >
              <p className="text-sm font-medium text-red-800 mb-1">Expenses</p>
              <p className="text-2xl font-bold text-red-700">{formatCurrency(expenses)}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg text-center ${
                balance >= 0 ? "bg-blue-50" : "bg-amber-50"
              }`}
            >
              <p className={`text-sm font-medium ${
                balance >= 0 ? "text-blue-800" : "text-amber-800"
              } mb-1`}>
                Balance
              </p>
              <p className={`text-2xl font-bold ${
                balance >= 0 ? "text-blue-700" : "text-amber-700"
              }`}>
                {formatCurrency(balance)}
              </p>
            </motion.div>
          </div>

          {expensesByCategory.length > 0 ? (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Expense Breakdown</p>
              <div className="h-64">
                <ExpenseChart data={expensesByCategory} />
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>Add some expenses to see your breakdown chart</p>
            </div>
          )}

          <Separator className="my-6" />

          <div>
            <p className="text-sm font-medium mb-4">Recent Transactions</p>
            {transactions.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No transactions yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-auto pr-2">
                {transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      transaction.type === "income"
                        ? "bg-green-50"
                        : "bg-red-50"
                    }`}
                  >
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                        {transaction.type === "expense" && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{transaction.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-semibold ${
                          transaction.type === "income"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTracker;
