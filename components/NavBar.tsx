"use client";
import React, { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Pokeball from "../public/file-pokeball-png-0.png";
import Image from "next/image";
import Link from "next/link";
import { useRandomPokemon } from "@/getFunctions/getFunctions";

function LandingNav(props: { hasButtons: boolean }) {
  const { data, isLoading, isError } = useRandomPokemon();
  const [id, setId] = useState(0);
  useEffect(() => {
    if (data) {
      setId(data["id"]);
    }
  }, []);

  return (
    <div className="fixed top-0 w-full h-20 rounded-md bg-black shadow-md shadow-gray-400">
      <div className="content">
        <div>
          <Link href="/">
            <Image
              src={Pokeball}
              alt="Pokeball"
              width={"60"}
              height={"60"}
              className="fixed top-2 ml-3"
            />
          </Link>
          <h1 className="fixed left-24 top-5 text-2xl w-max font-semibold text-white">
            Pokedex
          </h1>
        </div>
        <div className="list flex justify-end mr-10">
          {props.hasButtons && (
            <ul className="flex mt-5">
              <Link href={"whosthatpokemon/"}>
                <li className="mr-3 bg-blue-500 p-2 text-white rounded-md">
                  Whos That Pokemon
                </li>
              </Link>
              <Link href={"/"}>
                <li className="mr-3 bg-blue-500 p-2 text-white rounded-md">
                  Battle Arena
                </li>
              </Link>
              <Link href={`http://localhost:3000/pokedex/${id}`}>
                <li className="mr-3 bg-blue-500 p-2 text-white rounded-md">
                  <button disabled={isLoading}>Random Pokemon</button>
                </li>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingNav;
