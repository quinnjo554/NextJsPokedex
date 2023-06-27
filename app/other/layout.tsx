import React from "react";
import { LayoutProps } from "@/.next/types/app/layout";
function layout({ children }: LayoutProps) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

export default layout;