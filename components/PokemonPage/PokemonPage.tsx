"use client";
import {
  getAbilities,
  usePokemonById,
  getChatBot,
} from "@/queries/getFunctions";
import React, { useEffect, useState, useRef } from "react";
import { startStarfieldAnimation } from "@/starfield";
import { SpriteButtons } from "./SpriteButtons";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PokemonInfoStats } from "./PokemonInfoStats";
import {
  ChakraProvider,
  Box,
  Button,
  Heading,
  Text,
  Grid,
  List,
  ListItem,
  InputGroup,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PokemonPage({ id }: PokemonProps) {
  const [pokeData, setPokemonData] = useState<pokemon>();
  const [spriteRender, setSpriteRender] = useState(``);
  const [background, setBackground] = useState<Array<string>>([]);
  const [abilitiesDesc, setAbilitiesDesc] = useState<Array<string>>([]);
  const [chatText, setChatText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCaptured, setIsCaptued] = useState(false);
  const [capturePressed, setCapturePressed] = useState(false);
  const [capturedIds, setCapturedIds] = useState<string[]>([]);
  const { data: pokemonData, isLoading, isError } = usePokemonById(id);
  const inputRef = useRef<HTMLInputElement>(null);
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Stats",
        font: {
          size: 20,
        },
        color: "white",
      },
      legend: {
        display: false,
      },
      tooltip: {},
    },
    scales: {
      x: {
        display: true,
        ticks: {
          color: "white",
        },
      },
      y: {
        display: false,
      },
    },
  };

  const data = {
    labels: [
      "HP",
      "Attack",
      "Defense",
      "Special Attack",
      "Special Defense",
      "Speed",
    ],
    datasets: [
      {
        label: pokeData?.name,
        data: pokeData
          ? [
              pokeData.hp,
              pokeData.attack,
              pokeData.defense,
              pokeData.specialAttack,
              pokeData.specialDefense,
              pokeData.speed,
            ]
          : [],
        backgroundColor: "rgba(255, 255, 255,0.9)",
      },
    ],
  };
  const typeColors: TypeColors = {
    normal: "bg-gray-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-500",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-blue-300",
    psychic: "bg-pink-500",
    bug: "bg-green-700",
    rock: "bg-gray-700",
    ghost: "bg-indigo-700",
    dragon: "bg-indigo-500",
    dark: "bg-gray-900",
    steel: "bg-gray-400",
    fairy: "bg-pink-300",
  };

  useEffect(() => {
    startStarfieldAnimation(canvasRef);
  }, []);

  function handleCapture() {
    if (id) {
      if (!isCaptured) {
        window.localStorage.setItem(String(window.localStorage.length), id);
        setCapturePressed(true);
      }
    }
  }

  async function handleOnClick() {
    const inputValue =
      inputRef.current?.value +
      " provide your answer as the pokedex from pokemon";
    if (inputValue) {
      const data: ChatResponse = await getChatBot(inputValue);
      if (data && data.data) {
        setChatText(data["data"]["data"]["conversation"]["output"]);
        console.log(data);
      } else {
        console.error("Invalid response format");
      }
    }
  }

  useEffect(() => {
    async function getPokeAbilities() {
      if (pokeData && pokeData.abilities) {
        const abilitiesArray = await Promise.all(
          pokeData.abilities.map(async (value) => {
            const abil = await getAbilities(value.name);
            return abil;
          })
        );
        setAbilitiesDesc(abilitiesArray);
        console.log(abilitiesArray); //next set [effect][effectname]
      }
    }

    getPokeAbilities();
  }, [pokeData]);

  useEffect(() => {
    if (pokemonData) {
      const color = typeColors[pokemonData.types[0].name] || "bg-gray-200";
      const color2 = typeColors[pokemonData.types[1]?.name] || color;
      let array: string[] = [color, color2];
      setBackground(array);
      setSpriteRender(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      );
      setPokemonData(pokemonData);
    }
  }, [pokemonData]);

  if (isError) {
    return <Text>Somthing went wrong</Text>;
  }
  if (isLoading) {
  }
  return (
    <ChakraProvider>
      <Box mx="auto" px={["4", "6", "8"]} maxW="3xl" mt="12" color="white">
        <canvas ref={canvasRef} className="starfield-canvas-pokemon bg-black" />
        <div className="fixed left-6 top-0">
          <Popover>
            <PopoverTrigger>
              <Text
                bg={"white"}
                p={"2"}
                borderRadius={"md"}
                cursor={"pointer"}
                textColor={"black"}
                _hover={{
                  bg: "blue.500",
                  textColor: "white",
                }}
              >
                Ask The Pokedex
              </Text>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton bg="black" />
              <PopoverHeader textColor="black" h="72" overflowY="scroll">
                {chatText}
              </PopoverHeader>
              <PopoverBody textColor="black">
                <InputGroup>
                  <Input ref={inputRef} />
                  <Button onClick={handleOnClick}>Ask</Button>
                </InputGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
        <Link href={`http://localhost:3000/pokedex/home`}>
          <Heading
            as="h1"
            bg="white"
            color="black"
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            mb="2"
            p="2"
            py="2"
            transition="all"
            rounded="md"
            _hover={{ bg: "blue.500" }}
          >
            Pokedex
          </Heading>
        </Link>

        <Heading
          as="h1"
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          mb="16"
          data-testid="pokemon-name"
        >
          {pokeData?.name} #{pokeData?.id}
        </Heading>

        <Grid gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gap="8">
          <Box position="relative">
            <Box w="max" className="cardSurface">
              <Box
                as="img"
                src={spriteRender}
                height="300"
                alt={pokeData?.name}
                borderRadius="md"
                bg="rgba(200,200,200,0.4)"
                w={"320px"}
                h={"320px"}
              />
            </Box>
          </Box>
          <SpriteButtons
            setSpriteRender={setSpriteRender}
            id={id}
          ></SpriteButtons>
          <Box>
            <Box
              className={`bg-opacity-60 ${background[0]}`}
              bg={background[0]}
              p="4"
              rounded="lg"
              shadow="lg"
            >
              <PokemonInfoStats pokeData={pokeData}></PokemonInfoStats>
            </Box>
            <Box
              className={` bg-opacity-60  ${background[1]}`}
              bg={background[1]}
              mt="8"
              p="4"
              rounded="lg"
              shadow="lg"
            >
              <Heading as="h2" fontSize="xl" fontWeight="bold" mb="4">
                Abilities
              </Heading>
              <List display="flex">
                {pokeData?.abilities.map((value, index) => (
                  <ListItem mr="3" key={index}>
                    <Popover>
                      <PopoverTrigger>
                        <Text className="bg-slate-200 bg-opacity-60 p-1 rounded-md cursor-pointer">
                          {value.name}
                        </Text>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton textColor={"black"} />
                        <PopoverHeader textColor={"black"}>
                          {value.name}
                        </PopoverHeader>
                        <PopoverBody textColor={"black"}>
                          {abilitiesDesc[index]}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Grid>
        <Box mt="8" rounded="lg" className={`${background[0]} bg-opacity-60`}>
          <Bar options={options} data={data} />
        </Box>
        <Box
          className={` bg-opacity-60 ${background[1]}`}
          bg={background[1]}
          mt="8"
          p="4"
          rounded="lg"
          shadow="lg"
        >
          <Heading as="h2" fontSize="xl" fontWeight="bold">
            Description
          </Heading>
          <Text>{pokeData?.description}</Text>
        </Box>
        <Box mt={3} mb={3} textAlign={"center"}>
          <Button
            onClick={() => {
              setIsCaptued(true);
              handleCapture();
            }}
          >
            Capture
          </Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default PokemonPage;
