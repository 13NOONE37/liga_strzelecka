import React from 'react';
import { motion } from 'framer-motion';

const animations = {
  initial: {
    opacity: 0,
  },
  animate: { opacity: 1 },
  exit: { opacity: 0.5 },
};
export default function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
}
