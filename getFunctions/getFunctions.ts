import { UseQueryResult, useQuery } from 'react-query';
import axios from 'axios';

export function usePagePokemon(page:string|undefined,size:string) {
  return useQuery(['allPokemon', page], async () => {
    const response = await axios.get(
      `http://localhost:9081/pokemon/all?page=${page}&size=${size}&sortBy=id&sortOrder=asc`
    );
    return response.data;
  });
}

export async function getPokemonEvolution(name:string){
  const lowercaseName = toLowercaseName(name);
  try {
    const species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${lowercaseName}`)
    const speciesData = species.data;
    const evolutionUrl = speciesData['evolution_chain']['url'];

    const response = await fetch(evolutionUrl);
    const data = response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
  }

  export function useEvolution(name: string | undefined): UseQueryResult<any, unknown> {
    const lowercaseName = toLowercaseName(name);
    return useQuery(["evolutions"], async () => {
      const species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${lowercaseName}`);
      const speciesData = species.data;
      const evolutionUrl = speciesData['evolution_chain']['url'];
      const response = await axios.get(evolutionUrl);
      return response.data;
    });
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


export function toLowercaseName(str:string | undefined) {
  if(str){
  return str.charAt(0).toLowerCase() + str.slice(1);
  }
}

export function usePokemonById(id:string|undefined) {
  return useQuery(['pokemon', id], async () => {
    const response = await axios.get(`http://localhost:9081/pokemon/${id}`);
    return response.data;
  });
}

export async function getPokemonById(id:string | undefined){
  const response = await axios.get(`http://localhost:9081/pokemon/${id}`);
  const data = response.data;
  return data;
}

export function useWeather(loaction:string) {
  return useQuery(['weather', loaction], async () => {
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=7ceda6646f114676b7e183240232106&q=Fargo&days=7&aqi=no&alerts=no`);
    return response.data;
  });
}


export function getNextPageNumber(
  currentPageNum:number,
  increment:number,
  minPageNum:number,
  maxPageNum:number
) {
  const nextPageNum = currentPageNum + increment;
  if (nextPageNum > maxPageNum - 1) {
    return maxPageNum - 1;
  } else if (nextPageNum < minPageNum) {
    return minPageNum;
  } else {
    return nextPageNum;
  }
}
export async function getPokeIdByName(name:string|undefined){
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data['id'];
  } catch (error) {
    console.log(error);
  }
  }

  export async function getLearnset(pokemonId: number): Promise<MoveLearnset[] | undefined> {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = response.data;
      const learnset: MoveLearnset[] = data.moves.map((moveData: any) => ({
        move: {
          name: moveData.move.name,
        },
        version_group_details: moveData.version_group_details,
      }));
      return learnset;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  //how do i use a query that needs another query
  export async function getAbilities(name:string|undefined){
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);
      const data = await response.json();
      
      return data["effect_entries"][1]["effect"];
    } catch (error) {
      console.log(error);
    }
    }

    const key = '6d6a57d5';

    export function useMovies() {
      return useQuery('pokemonMovies', async () => {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${key}&s=pokemon`);
        return response.data;
      });
    }

    export function useMoviesDetails(id:string|undefined) {
      return useQuery('pokemonMoviesDetail', async () => {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${key}&i=${id}`);
        return response.data;
      });
    }
    export async function getMoveInfo(name:string){
      const response = await axios.get(`https://pokeapi.co/api/v2/move/${name}`);
      const data =  response.data
      const move:Move = {
        basePower: data.power,
        type:data.type.name,
        accuracy:data.accuracy
      }
      return move
    }
    export async function getChatBot(message:string){
      const axios = require('axios');
      const options = {
        method: 'POST',
        url: 'https://lemurbot.p.rapidapi.com/chat',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '4c88693f7cmsh43012ae9e3ab147p1316e7jsn1a548a1b97e2',
          'X-RapidAPI-Host': 'lemurbot.p.rapidapi.com'
        },
        data: {
          bot: 'dilly',
          client: 'd531e3bd-b6c3-4f3f-bb58-a6632cbed5e2',
          message: message
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
        return response
      } catch (error) {
        console.error(error);
        return error
      }
    }