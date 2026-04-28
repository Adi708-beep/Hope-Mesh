import React from "react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const GlassCard = ({ children, className = "", delay = 0 }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className={`platform-card ${className}`.trim()}
    >
      {children}
    </MotionDiv>
  );
};

export default GlassCard;