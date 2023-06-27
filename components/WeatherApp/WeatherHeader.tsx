import React from "react";
import { Heading } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

function WeatherHeader(props: {
  dayWeather: forecastday[] | undefined;
  weather: WeatherData | undefined;
}) {
  return (
    <div className="w-max h-max self-center ml-28 mt-10 mb-9">
      <Heading fontWeight={"normal"} className="ml-7">
        {props.weather?.location.name}
      </Heading>
      <Heading as="h1" fontWeight={"thin"} size="4xl" className="mb-1 ml-6">
        {props.weather ? Math.round(props.weather?.current.temp_f) : <></>}°
      </Heading>
      <Heading as="h3" className="mb-1 ml-4" size="md" fontWeight="semibold">
        {props.weather?.current.condition.text}
      </Heading>
      <div className="flex ml-5">
        <Heading className="mr-2" fontWeight="normal" size="sm">
          H:{props.dayWeather ? props.dayWeather[0].day.maxtemp_f : <></>}°
        </Heading>
        <Heading fontWeight="normal" size="sm">
          L:{props.dayWeather ? props.dayWeather[0].day.mintemp_f : <></>}°
        </Heading>
      </div>
    </div>
  );
}

export default WeatherHeader;
