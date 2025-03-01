
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import ExpenseTracker from "@/components/ExpenseTracker";
import AIAdvisor from "@/components/AIAdvisor";
import FinanceChat from "@/components/FinanceChat";
import Scenarios from "@/components/Scenarios";
import ApiSettings from "@/components/ApiSettings";
import { FinanceProvider, useFinance } from "@/context/FinanceContext";

interface LocationState {
  activeTab?: string;
}

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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tracker");
  const location = useLocation();
  const state = location.state as LocationState | null;
  
  useEffect(() => {
    if (state?.activeTab) {
      setActiveTab(state.activeTab);
    }
  }, [state]);

  return (
    <FinanceProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab} appName="WealthBridge">
        <TabContent activeTab={activeTab} />
      </Layout>
    </FinanceProvider>
  );
};

export default Dashboard;
