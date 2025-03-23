

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import TransitionComponent from "./TransitionComponent";
import { Link, useNavigate } from "react-router-dom";
import { navigateTo } from "@/utils/navigation";

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  appName?: string;
}

const Layout = ({ children, activeTab, setActiveTab, appName = "WealthBridge" }: LayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-finance-light to-white">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="text-center mb-6">
            <div 
              onClick={() => navigateTo.home(navigate)} 
              className="inline-block cursor-pointer"
            >
              <h1 className="text-4xl font-bold text-finance-charcoal tracking-tight mb-2">
                {appName}
              </h1>
            </div>
            <p className="text-finance-gray max-w-xl mx-auto">
              Your personal guide to financial literacy and management
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full max-w-2xl"
            >
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger
                  value="tracker"
                  className={cn(
                    "data-[state=active]:bg-white data-[state=active]:text-finance-blue data-[state=active]:shadow-md",
                    "smooth-transition"
                  )}
                >
                  Expense Tracker
                </TabsTrigger>
                <TabsTrigger
                  value="advisor"
                  className={cn(
                    "data-[state=active]:bg-white data-[state=active]:text-finance-indigo data-[state=active]:shadow-md",
                    "smooth-transition"
                  )}
                >
                  AI Advisor
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className={cn(
                    "data-[state=active]:bg-white data-[state=active]:text-finance-teal data-[state=active]:shadow-md",
                    "smooth-transition"
                  )}
                >
                  Finance Chat
                </TabsTrigger>
                <TabsTrigger
                  value="scenarios"
                  className={cn(
                    "data-[state=active]:bg-white data-[state=active]:text-finance-charcoal data-[state=active]:shadow-md",
                    "smooth-transition"
                  )}
                >
                  Scenarios
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className={cn(
                    "data-[state=active]:bg-white data-[state=active]:text-finance-purple data-[state=active]:shadow-md",
                    "smooth-transition"
                  )}
                >
                  API Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        <TransitionComponent>
          {children}
        </TransitionComponent>
      </main>
    </div>
  );
};

export default Layout;
