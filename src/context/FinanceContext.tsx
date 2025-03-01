
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Transaction } from "@/components/ExpenseTracker";

interface FinanceContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void;
  deleteTransaction: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType>({
  transactions: [],
  addTransaction: () => {},
  deleteTransaction: () => {},
});

export const useFinance = () => useContext(FinanceContext);

interface FinanceProviderProps {
  children: ReactNode;
}

export const FinanceProvider = ({ children }: FinanceProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load transactions from localStorage on initial render
  useEffect(() => {
    const savedTransactions = localStorage.getItem("finance_transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("finance_transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, "id" | "date">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
