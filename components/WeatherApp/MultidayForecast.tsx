import React, { useState } from "react";
import {
  Card,
  Stack,
  StackDivider,
  Box,
  Text,
  List,
  Flex,
  Image,
  Collapse,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import HourlyForecast from "./HourlyForecast";
import RainChance from "./RainChance";
export default function MultidayForecast(props: {
  dayWeather: forecastday[] | undefined;
  month: string;
  day: string[];
  weather: WeatherData | undefined;
  currentHour: number;
}) {
  const [showDayData, setShowDayData] = useState<number | null>(null);

  function handleOnClick(index: number) {
    setShowDayData((prev) => (prev === index ? null : index));
  }

  return (
    <div className="flex justify-center mt-8">
      <Card
        className="w-[25rem]"
        bg="rgba(80,80,255,0.8)"
        _before={{
          opacity: 0.1,
        }}
      >
        <Stack divider={<StackDivider />} spacing={0}>
          <Box>
            <Text className="text-white mt-2 ml-3 mb-1 opacity-60 font-semibold text-sm">
              <CalendarIcon className="mb-1 mr-1" />7 Day Forecast
            </Text>
          </Box>
          {props.dayWeather?.map((value, index) => {
            const isDropdownVisible = showDayData === index;
            return (
              <div key={index}>
                <List
                  className="text-white mt-1 pl-2 pt-1"
                  onClick={() => {
                    handleOnClick(index);
                  }}
                >
                  <Flex direction="row" align="center">
                    <Text className="w-max">{`${props.month} ${props.day[index]}`}</Text>
                    <Image
                      src={value.day.condition.icon}
                      w="9"
                      className="mr-6 ml-6"
                    />
                    <Text className="mr-8">{value.day.avgtemp_f}°</Text>
                    <Flex align="center" ml="auto">
                      <Text className="opacity-60">{value.day.mintemp_f}°</Text>
                      <Text mx="2">/</Text>
                      <Text mr="2">{value.day.maxtemp_f}°</Text>
                    </Flex>
                  </Flex>
                </List>
                {/**Make this a component */}
                <Collapse in={isDropdownVisible} animateOpacity>
                  <Box>
                    <Text>
                      <HourlyForecast
                        showHeader={false}
                        currentHour={props.currentHour}
                        weather={props.weather}
                        dayWeather={props.dayWeather}
                        backgroundColor="rgba(0,0,0)"
                        index={index}
                      ></HourlyForecast>
                      <RainChance
                        weather={props.weather}
                        dayWeather={props.dayWeather}
                        currentHour={props.currentHour}
                        backgroundColor="rbga(0,0,0)"
                      ></RainChance>
                    </Text>
                  </Box>
                </Collapse>
              </div>
            );
          })}
        </Stack>
      </Card>
    </div>
  );
}
