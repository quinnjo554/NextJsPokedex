import { UseQueryResult, useQuery } from 'react-query';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
import axios from 'axios';

export const usePokemonInfinite = () => {
  return useInfiniteQuery({
    queryKey:["pokemon"],
    getNextPageParam: (lastPage,pages)=>lastPage.pageable.pageNumber + 1,
    queryFn:getPokemon,
  });
};

async function getPokemon({pageParam:page=0}){
  const response = await axios.get(
  `http://localhost:9081/pokemon/all?page=${page}&size=${32}&sortBy=id&sortOrder=asc`
  );
  return response.data;
}

export function useAllPokemon(): UseQueryResult<any, unknown> {
  return useQuery(["allPokemon"], async () => {
    const response = await axios.get(
      `http://localhost:9081/pokemon/all?page=0&size=550&sortBy=id&sortOrder=asc`
    );
    return response.data;
  });
}

export function useRandomPokemon() {
  return useQuery("randomPokemon", async () => {
    const response = await axios.get("http://localhost:9081/pokemon/random");
    return response.data;
  });
}

export function toLowercaseName(str:string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function usePokemonList(id:string|undefined) {
  return useQuery(['pokemon', id], async () => {
    const response = await axios.get(`http://localhost:9081/pokemon/${id}`);
    return response.data;
  });
}



