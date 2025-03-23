
import { motion } from "framer-motion";

interface MessageProps {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const MessageItem = ({ id, text, sender, timestamp }: MessageProps) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          sender === "user"
            ? "bg-finance-blue text-white"
            : "bg-gray-100 text-finance-charcoal"
        }`}
      >
        <p className="text-sm">{text}</p>
        <p className="text-xs opacity-70 mt-1 text-right">
          {timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageItem;
