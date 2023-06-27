"use client";
import {
  ChakraProvider,
  Card,
  Stack,
  StackDivider,
  Box,
  Text,
  UnorderedList,
  List,
  Flex,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { TimeIcon } from "@chakra-ui/icons";
import { format } from "date-fns";

function HourlyForecast(props: {
  dayWeather: forecastday[] | undefined;
  weather: WeatherData | undefined;
  currentHour: number;
  showHeader: boolean;
  backgroundColor: string;
  index: number;
}) {
  //dont understand the format method tbh
  function formatHour(hour: number) {
    const formattedHour = format(new Date().setHours(hour), "h a");
    return formattedHour;
  }

  return (
    <ChakraProvider>
      <div className="flex justify-center">
        <Card
          className="w-[25rem]"
          bg={props.backgroundColor}
          _before={{
            opacity: 0.1,
          }}
        >
          <Stack divider={<StackDivider />} spacing="0">
            <Box>
              {props.showHeader ? (
                <Text
                  className="ml-3 text-2xl text-white font-semibold opacity-60"
                  fontSize="sm"
                >
                  <TimeIcon mb="1" /> Hourly Forecast
                </Text>
              ) : (
                <></>
              )}
            </Box>
            <Box>
              <UnorderedList className="text-white mt-3 mr-3 ml-3 flex overflow-x-scroll">
                {props.dayWeather &&
                  props.dayWeather[props.index].hour.map((value, index) => {
                    if (index >= props.currentHour) {
                      if (index === props.currentHour) {
                        return (
                          <List key={index} className="mr-7">
                            <Flex direction="column" alignItems="center">
                              <Text size="sm" className="text-base w-max">
                                {formatHour(props.currentHour)}
                              </Text>
                              <Image
                                src={props.weather?.current.condition.icon}
                                boxSize="24px"
                                alt=""
                              />
                              <Text>
                                {props.dayWeather ? (
                                  props.dayWeather[props.index].hour[index]
                                    .temp_f
                                ) : (
                                  <></>
                                )}
                                °
                              </Text>
                            </Flex>
                          </List>
                        );
                      }
                      return (
                        <List key={index} className="mr-7">
                          <Flex direction="column" alignItems="center">
                            <Text className="text-base w-max" size="sm">
                              {formatHour(index)}
                            </Text>
                            <Image
                              src={value.condition.icon}
                              boxSize="24px"
                              alt=""
                            />
                            <Text>{value.temp_f}°</Text>
                          </Flex>
                        </List>
                      );
                    } else {
                      return null;
                    }
                  })}
              </UnorderedList>
            </Box>
          </Stack>
        </Card>
      </div>
    </ChakraProvider>
  );
}

export default HourlyForecast;
