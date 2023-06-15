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
      params: { id: string };
    }