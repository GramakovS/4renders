'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function ReactQueryDevtoolsClient() {
  return <ReactQueryDevtools initialIsOpen={false} />;
}