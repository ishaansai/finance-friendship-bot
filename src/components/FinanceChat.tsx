
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizontal, Bot } from "lucide-react";
import { toast } from "sonner";
import { useApiKey } from "@/hooks/useApiKey";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// Mock responses - these would be replaced with actual API calls in production
const mockResponses: Record<string, string> = {
  "default": "I'd be happy to help with your financial questions. What would you like to know about?",
  "emergency fund": "An emergency fund is a financial safety net that everyone should have. Aim to save 3-6 months of essential expenses in an easily accessible account.",
  "investing": "Investing is putting money into financial products with the hope of growing your wealth. Common investment options include stocks, bonds, real estate, and index funds.",
  "credit score": "Your credit score is a number between 300-850 that represents your creditworthiness. Factors that affect it include payment history, amounts owed, length of credit history, new credit, and credit mix.",
  "budget": "A budget is a plan for your money. Start by tracking your income and expenses, then allocate funds to needs, wants, and savings. The 50/30/20 rule suggests spending 50% on needs, 30% on wants, and saving 20%.",
  "debt": "Not all debt is bad, but high-interest debt like credit cards should be prioritized for payoff. Consider strategies like the avalanche method (paying highest interest first) or the snowball method (paying smallest balances first).",
  "retirement": "Start saving for retirement as early as possible to benefit from compound interest. Common retirement accounts include 401(k)s, IRAs, and Roth IRAs, which offer tax advantages."
};

function findBestResponse(query: string): string {
  query = query.toLowerCase();
  
  for (const [keyword, response] of Object.entries(mockResponses)) {
    if (query.includes(keyword.toLowerCase())) {
      return response;
    }
  }
  
  return mockResponses.default;
}

const FinanceChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm your financial literacy assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { apiKey, checkApiKey } = useApiKey();

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Check if API key is available
    if (!checkApiKey()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate API response delay
    setTimeout(() => {
      try {
        // This is a mock implementation - in a real app, you would make an API call
        const response = findBestResponse(input);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        
        // Example of how you would make an actual API call:
        /*
        const fetchAIResponse = async () => {
          const response = await fetch('https://api.example.com/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              message: input,
              conversationHistory: messages
            })
          });

          if (!response.ok) {
            throw new Error('Failed to get response');
          }

          const data = await response.json();
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.response,
            sender: "ai",
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, aiMessage]);
        };

        fetchAIResponse();
        */
        
      } catch (error) {
        console.error('Error getting response:', error);
        toast.error("Failed to get response. Please try again.");
      } finally {
        setIsTyping(false);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="glass h-[700px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Bot className="h-5 w-5 mr-2 text-finance-teal" />
          Finance Chat
        </CardTitle>
        <CardDescription>
          Ask any questions about financial literacy and get instant answers
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-4 pt-0">
        <ScrollArea className="flex-grow mb-4 pr-4">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-finance-blue text-white"
                        : "bg-gray-100 text-finance-charcoal"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2 mt-2">
          <Input
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow"
          />
          <Button 
            onClick={handleSend} 
            size="icon" 
            disabled={!input.trim() || isTyping}
            className="shrink-0"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinanceChat;
