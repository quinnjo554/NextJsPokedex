import React from "react";
import PokemonList from "@/components/PokemonList";
import { LayoutProps } from "@/.next/types/app/layout";
import LandingNav from "@/components/NavBar";
function layout({ children }: LayoutProps) {
  return (
    //pass the param to pokelist as a prop
    //How would you increment the id from a server component?
    <div>
      <div>{children}</div>
    </div>
  );
}

export default layout;
