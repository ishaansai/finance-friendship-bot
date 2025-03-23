
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence } from "framer-motion";
import MessageItem from "./MessageItem";
import TypingIndicator from "./TypingIndicator";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList = ({ messages, isTyping }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-grow mb-4 pr-4">
      <div className="space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              id={message.id}
              text={message.text}
              sender={message.sender}
              timestamp={message.timestamp}
            />
          ))}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageList;
