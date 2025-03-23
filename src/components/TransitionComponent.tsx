

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionComponentProps {
  children: ReactNode;
}

const TransitionComponent = ({ children }: TransitionComponentProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionComponent;
