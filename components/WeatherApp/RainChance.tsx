import {
  ChakraProvider,
  Box,
  Text,
  UnorderedList,
  List,
  Card,
} from "@chakra-ui/react";
import React from "react";

function RainChance(props: {
  dayWeather: forecastday[] | undefined;
  weather: WeatherData | undefined;
  currentHour: number;
  backgroundColor: string;
}) {
  return (
    <ChakraProvider>
      <Card className="bg-black">
        <UnorderedList className="text-black flex">
          {props.dayWeather?.map((value, index) => {
            return (
              <List className="mr-3">
                <Text>{value.hour[3].chance_of_rain}</Text>
              </List>
            );
          })}
        </UnorderedList>
      </Card>
    </ChakraProvider>
  );
}

export default RainChance;
