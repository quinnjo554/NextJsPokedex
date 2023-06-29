import React from "react";
import { FC } from "react";
import PokemonMoviePage from "@/components/PokemonMoviePage";
const Page: FC<PageProps> = ({ params }) => {
  return (
    <div className="text-black">
      <PokemonMoviePage id={params.id}></PokemonMoviePage>
    </div>
  );
};

export default Page;
