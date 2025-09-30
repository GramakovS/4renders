'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
};

export default function LoadingSpinner({
  size = 'md',
  text = 'Loading...',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <Loader2
        className={`${sizeClasses[size]} text-blue-600 animate-spin`}
      />
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
          {text}
        </p>
      )}
    </motion.div>
  );
}