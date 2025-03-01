
import { useState } from "react";
import Layout from "@/components/Layout";
import ExpenseTracker from "@/components/ExpenseTracker";
import AIAdvisor from "@/components/AIAdvisor";
import FinanceChat from "@/components/FinanceChat";
import Scenarios from "@/components/Scenarios";
import ApiSettings from "@/components/ApiSettings";
import { FinanceProvider, useFinance } from "@/context/FinanceContext";
import { Transaction } from "@/components/ExpenseTracker";
import { toast } from "sonner";

const TabContent = ({ activeTab }: { activeTab: string }) => {
  const { transactions } = useFinance();

  return (
    <>
      {activeTab === "tracker" && <ExpenseTracker />}
      {activeTab === "advisor" && <AIAdvisor transactions={transactions} />}
      {activeTab === "chat" && <FinanceChat />}
      {activeTab === "scenarios" && <Scenarios />}
      {activeTab === "settings" && <ApiSettings />}
    </>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("tracker");

  return (
    <FinanceProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <TabContent activeTab={activeTab} />
      </Layout>
    </FinanceProvider>
  );
};

export default Index;
