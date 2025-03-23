
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  isTyping: boolean;
}

const ChatInput = ({ input, setInput, handleSend, isTyping }: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
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
  );
};

export default ChatInput;
