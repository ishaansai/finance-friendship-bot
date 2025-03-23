
import { motion } from "framer-motion";

interface MessageProps {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  status?: "sending" | "sent" | "error";
}

const MessageItem = ({ id, text, sender, timestamp, status }: MessageProps) => {
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
        } ${status === "error" ? "border-2 border-red-500" : ""}`}
      >
        <p className="text-sm">{text}</p>
        <div className="flex justify-end items-center mt-1">
          {status === "sending" && (
            <span className="text-xs mr-2 opacity-70">Sending...</span>
          )}
          {status === "error" && (
            <span className="text-xs mr-2 text-red-500">Failed to send</span>
          )}
          <p className="text-xs opacity-70 text-right">
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageItem;
