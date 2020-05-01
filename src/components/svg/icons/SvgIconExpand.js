import React from 'react';
import { motion } from 'framer-motion';

const SvgIconExpand = props => {
  return (
    <motion.svg viewBox="0 0 24 24" {...props}>
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </motion.svg>
  );
}

export default SvgIconExpand;
