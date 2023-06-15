import React, { FC } from "react";
import PokemonList from "@/components/PokemonList";
import { PageProps } from "@/.next/types/app/layout";
import LandingNav from "@/components/NavBar";
//anything in the app folder is a server componet  unless u put "use client" at the top
//any hooks or states have to be in a client component

//use SSG

const PokedexPage: FC<PageProps> = ({ params }) => {
  //get List of pokemon (pokemonList Component)
  //Navbar Component
  return (
    <div className="pokedex">
      <LandingNav hasButtons={true} />
      <PokemonList id={params.id}></PokemonList>
    </div>
  );
};

export default PokedexPage;
