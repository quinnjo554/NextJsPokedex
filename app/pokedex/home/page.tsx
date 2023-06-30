import React, { FC } from "react";
import PokemonList from "@/components/PokemonList";
import { PageProps } from "@/.next/types/app/layout";
import LandingNav from "@/components/NavBar";

const PokedexPage: FC<PageProps> = ({ params }) => {
  return (
    <div className="pokedex">
      <LandingNav hasButtons={true} />
      <PokemonList id="0"></PokemonList>
    </div>
  );
};

export default PokedexPage;
