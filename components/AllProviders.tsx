import React from "react";
import { LayoutProps } from "@/.next/types/app/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { CacheProvider } from "@chakra-ui/next-js";
function AllProviders({ children }: LayoutProps) {
  return (
    <ReactQueryProvider>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </ReactQueryProvider>
  );
}

export default AllProviders;
