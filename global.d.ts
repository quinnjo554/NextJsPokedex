 interface pageProps {
    params:{id: Number}
 }
 
 
 interface MoveLearnset {
    move: {
      name: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
      };
    }[];
  }
   interface Move {
    basePower: number;
    accuracy: number;
    type: string;
  }
  
   interface pokemon{
      name: string;
      id: string;
      types: Type[];
      attack: number;
      defense: number;
      abilities: Ability[];
      description: string;
      eggGroups: EggGroup[];
      genus: string;
      height: string;
      hp: number;
      specialAttack: number;
      specialDefense: number;
      speed: number;
      weight: string;
  }
  
   interface evolutionChain{
    evolves_to:evolve_to[],
    species:species
  }
   interface species{
    name:string,
    url:string
  }
   interface evolve_to{
    species:species,
    evolves_to:evolve_to[]
  }
  
   interface Type{
      id:string,
      name:string
  }
   interface Ability {
      id:string,
      name:string
    }
    
     interface EggGroup {
      id:string,
      name:string
    }
     interface TypeColors {
      [key: string]: string;
    }
  
     interface PresentPokemonProps {
      page: string;
      selectedPokemon:string
      onPokemonClick: (pokemon: string) => void;
    }

    interface PokemonProps {
      id: string | undefined;
      
    }
    interface PageProps {
     params: { id: string; };
    }

    interface MovieApi {
      Title:string,
      Year:number,
      imdbID:string,
      Type:string,
      Poster:string
    }


    interface ChatResponse {
      data: {
        success: boolean;
        data: {
          conversation: {
            id: number;
            slug: string;
            input: string;
            output: string;
            topic: string;
          };
          bot: {
            id: number;
            slug: string;
            name: string;
            image: string;
          };
          client: {
            id: number;
            slug: string;
            is_banned: boolean;
            image: string;
          };
          features: any[]; // You can replace 'any' with a more specific type if available
          metadata: {
            version: string;
            date: string;
            duration: number;
          };
        };
        message: string;
      };
      status: number;
      statusText: string;
      headers: {
        [key: string]: string;
      };
      config: {
        transitional: {
          silentJSONParsing: boolean;
          forcedJSONParsing: boolean;
          clarifyTimeoutError: boolean;
        };
        adapter: string[];
        transformRequest: null[];
        transformResponse: null[];
        timeout: number;
        xsrfCookieName: string;
        xsrfHeaderName: string;
        maxContentLength: number;
        maxBodyLength: number;
        env: any; // You can replace 'any' with a more specific type if available
        headers: {
          Accept: string;
          "Content-Type": string;
          "X-RapidAPI-Key": string;
          "X-RapidAPI-Host": string;
        };
        method: string;
        url: string;
        data: string;
      };
      request: any; // You can replace 'any' with a more specific type if available
    }
    


    interface MovieDetails {
      Title: string;
      Year: string;
      Rated: string;
      Released: string;
      Runtime: string;
      Genre: string;
      Director: string;
      Writer: string;
      Actors: string;
      Plot: string;
      Language: string;
      Country: string;
      Awards: string;
      Poster: string;
      Ratings: { Source: string; Value: string }[];
      Metascore: string;
      imdbRating: string;
      imdbVotes: string;
      imdbID: string;
      Type: string;
      totalSeasons: string;
      Response: string;
    }
    
   

    