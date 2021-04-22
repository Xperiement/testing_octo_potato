import React from "react";
import "../styles/SwipeDown.scss";
import { motion, AnimatePresence } from "framer-motion";

export default function SwipeDown() {
  return (
    <motion.div
      className="swipeDown"
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
    >
      <button>
        <motion.div
          initial={{
            y: 0,
            opacity: 1,
          }}
          animate={{
            y: [25, 25, 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 1,
            yoyo: Infinity,
          }}
        ></motion.div>
      </button>
    </motion.div>
  );
}
