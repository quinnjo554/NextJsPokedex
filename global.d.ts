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
    
   
    interface WeatherData {
      location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
      };
      current: {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        vis_km: number;
        vis_miles: number;
        uv: number;
        gust_mph: number;
        gust_kph: number;
      };
    }
    
  interface dayData {
      maxtemp_c: number;
      maxtemp_f: number;
      mintemp_c: number;
      mintemp_f: number;
      avgtemp_c: number;
      avgtemp_f: number;
      maxwind_mph: number;
      maxwind_kph: number;
      totalprecip_mm: number;
      totalprecip_in: number;
      totalsnow_cm: number;
      avgvis_km: number;
      avgvis_miles: number;
      avghumidity: number;
      daily_will_it_rain: number;
      daily_chance_of_rain: number;
      daily_will_it_snow: number;
      daily_chance_of_snow: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
      uv: number;
    }

    interface WeatherForecast {
      time_epoch: number;
      time: string;
      temp_c: number;
      temp_f: number;
      is_day: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
      wind_mph: number;
      wind_kph: number;
      wind_degree: number;
      wind_dir: string;
      pressure_mb: number;
      pressure_in: number;
      precip_mm: number;
      precip_in: number;
      humidity: number;
      cloud: number;
      feelslike_c: number;
      feelslike_f: number;
      windchill_c: number;
      windchill_f: number;
      heatindex_c: number;
      heatindex_f: number;
      dewpoint_c: number;
      dewpoint_f: number;
      will_it_rain: number;
      chance_of_rain: number;
      will_it_snow: number;
      chance_of_snow: number;
      vis_km: number;
      vis_miles: number;
      gust_mph: number;
      gust_kph: number;
      uv: number;
    }
    
  
    interface forecastday {
      day:dayData,
      hour:WeatherForecast[]
    }
    interface SpriteButtonsProps {
      setSpriteRender: React.Dispatch<React.SetStateAction<string>>;
      id:string | undefined;
    }
    