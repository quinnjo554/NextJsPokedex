import React from "react";
import { FC } from "react";
import PokedexPage from "../page";
import PokemonPage from "@/components/PokemonPage";


const Page: FC<PageProps> = ({ params }) => {
  return (
    <div className="text-white">
      <PokemonPage id={params.id} />
    </div>
  );
};

export default Page;
