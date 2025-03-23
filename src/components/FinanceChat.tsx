

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { toast } from "sonner";
import { useApiKey } from "@/hooks/useApiKey";
import MessageList from "./chat/MessageList";
import ChatInput from "./chat/ChatInput";
import { findBestResponse } from "@/services/chatService";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
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
        <MessageList messages={messages} isTyping={isTyping} />
        <ChatInput 
          input={input} 
          setInput={setInput} 
          handleSend={handleSend} 
          isTyping={isTyping} 
        />
      </CardContent>
    </Card>
  );
};

export default FinanceChat;
