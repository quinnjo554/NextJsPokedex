import React from "react";
import PokemonList from "@/components/PokemonList";
import { LayoutProps } from "@/.next/types/app/layout";
import LandingNav from "@/components/NavBar";
function layout({ children }: LayoutProps) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

export default layout;
