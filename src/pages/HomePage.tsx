
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-finance-light to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-finance-charcoal tracking-tight mb-4">
            WealthBridge
          </h1>
          <p className="text-finance-gray text-xl max-w-2xl mx-auto mb-8">
            Your bridge to financial freedom and literacy
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-finance-blue hover:bg-finance-blue/90 text-white px-8"
              onClick={() => navigate("/dashboard")}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-finance-blue text-finance-blue hover:bg-finance-blue/10"
              onClick={() => navigate("/dashboard", { state: { activeTab: "advisor" } })}
            >
              AI Finance Advisor
            </Button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass p-6 rounded-xl"
          >
            <div className="w-12 h-12 bg-finance-blue/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-finance-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-finance-charcoal mb-2">Expense Tracking</h3>
            <p className="text-finance-gray">Keep track of your spending habits and see where your money goes with our intuitive expense tracker.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass p-6 rounded-xl"
          >
            <div className="w-12 h-12 bg-finance-indigo/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-finance-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-finance-charcoal mb-2">AI-Powered Advice</h3>
            <p className="text-finance-gray">Get personalized financial advice based on your spending patterns and financial goals.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass p-6 rounded-xl"
          >
            <div className="w-12 h-12 bg-finance-teal/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-finance-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-finance-charcoal mb-2">Financial Scenarios</h3>
            <p className="text-finance-gray">Explore different financial scenarios and see how they might impact your future financial health.</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass-dark p-8 rounded-xl text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Ready to take control of your finances?</h2>
          <p className="mb-6 text-white/80">Join thousands of users who are already on their path to financial freedom.</p>
          <Button 
            size="lg" 
            className="bg-white text-finance-charcoal hover:bg-white/90"
            onClick={() => navigate("/dashboard")}
          >
            Start Your Journey
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
