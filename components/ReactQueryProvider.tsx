"use client";

import { QueryClientProvider } from "react-query";
import queryClient from "@/queryClient";
export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
