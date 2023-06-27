import React from "react";
import { LayoutProps } from "@/.next/types/app/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryProvider } from "./ReactQueryProvider";
function AllProviders({ children }: LayoutProps) {
  return (
    <ChakraProvider>
      <ReactQueryProvider>
        <div>{children}</div>
      </ReactQueryProvider>
    </ChakraProvider>
  );
}

export default AllProviders;
