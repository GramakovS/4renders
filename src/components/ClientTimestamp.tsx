'use client';

import { useEffect, useState } from 'react';

export type ClientTimestampProps = {
  className?: string;
};

export default function ClientTimestamp({ className }: ClientTimestampProps) {
  const [mounted, setMounted] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    setMounted(true);
    setTimestamp(new Date().toLocaleString());
  }, []);

  if (!mounted) {
    return <span className={className}>Loading...</span>;
  }

  return <span className={className}>{timestamp}</span>;
}