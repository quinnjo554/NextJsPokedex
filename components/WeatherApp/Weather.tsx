"use client";
import { ChakraProvider, Image } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import {
  Box,
} from "@chakra-ui/react";
import MultidayForecast from "./MultidayForecast";
import HourlyForecast from "./HourlyForecast";
import WeatherHeader from "./WeatherHeader";
import { useWeather } from "@/getFunctions/getFunctions";
import Cloudy from "../../public/weather/srG.gif";
import Rainy from "../../public/weather/4lsB.gif";
import Clear from "../../public/weather/QINk.gif";
import Thunder from "../../public/weather/thunder.gif";
function Weather() {
  const [weather, setWeather] = useState<WeatherData>();
  const [dayWeather, setDayWeather] = useState<forecastday[]>();
  const { data, isLoading, isError } = useWeather("Fargo");
  const [currentHour, setCurrentHour] = useState<number>(0);
  const [background, setBackground] = useState<string>(Cloudy.src);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState<Array<string>>([]);

  useEffect(() => {
    if (data) {
      setDayWeather(data["forecast"]["forecastday"]);
      setWeather(data);
      setBackground(getBackgroundImage(data.current.condition.code));
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    getCurrentDate();
    getMonthandDay(0);
  }, []);

  function getMonthandDay(dayInc: number) {
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    const day = today.getDate();
    const dayArray = Array.from({ length: 7 }, (_, index) =>
      String(day + index)
    );
    setMonth(month);
    setDay(dayArray);
    return String(day + dayInc);
  }

  function getCurrentDate() {
    const today = new Date();
    setCurrentHour(today.getHours());
  }
  function getBackgroundImage(conditionCode: number): string {
    switch (conditionCode) {
      case 1000: // Clear
        return Clear.src;
      case 1003: // Partly cloudy
      case 1009: // Overcast
        return Cloudy.src;
      case 1063: // Patchy rain possible
      case 1150: // Patchy freezing drizzle possible
      case 1153: // Light drizzle
      case 1180: // Light rain
      case 1183: // Moderate rain at times
      case 1186: // Moderate rain
      case 1189: // Heavy rain at times
      case 1192: // Heavy rain
      case 1195: // Light freezing rain
      case 1198: // Moderate or heavy freezing rain
      case 1201: // Light sleet
      case 1204: // Moderate or heavy sleet
      case 1207: // Light snow showers
      case 1210: // Moderate or heavy snow showers
      case 1213: // Light showers of ice pellets
      case 1216: // Moderate or heavy showers of ice pellets
      case 1219: // Light rain shower
      case 1222: // Moderate or heavy rain shower
      case 1225: // Light sleet showers
      case 1237: // Light snow
      case 1240: // Moderate or heavy snow
      case 1243: // Patchy light snow
      case 1246: // Light snow showers
      case 1249: // Moderate or heavy snow showers
      case 1252: // Light showers of ice pellets
      case 1255: // Moderate or heavy showers of ice pellets
      case 1258: // Light showers of rain and snow
      case 1261: // Moderate or heavy showers of rain and snow
      case 1264: // Light sleet showers
      case 1273: // Moderate or heavy snow showers
      case 1276: // Light showers of ice pellets
      case 1279: // Moderate or heavy showers of ice pellets
      case 1282: // Thunderstorm with light rain
      case 1285: // Thunderstorm with rain
      case 1288: // Thunderstorm with heavy rain
      case 1291: // Light thunderstorm
      case 1294: // Moderate or heavy thunderstorm
        return Rainy.src;
      case 1087: // Thundery outbreaks possible
      case 1273: // Patchy light rain with thunder
      case 1276: // Moderate or heavy rain with thunder
      case 1279: // Patchy light snow with thunder
      case 1282: // Moderate or heavy snow with thunder
      case 1285: // Patchy light sleet with thunder
      case 1288: // Moderate or heavy sleet with thunder
      case 1291: // Patchy light snow showers with thunder
      case 1294: // Moderate or heavy snow showers with thunder
        return Thunder.src;
      default:
        return "";
    }
  }

  return (
    <ChakraProvider>
      <Image
        src={`${background}`}
        className="w-full h-full -z-30 fixed top-0 left-0"
      ></Image>
      <div className={`text-white`}>
        <Box className="grid justify-center mt-7">
          <WeatherHeader
            weather={weather}
            dayWeather={dayWeather}
          ></WeatherHeader>
          <HourlyForecast
            weather={weather}
            dayWeather={dayWeather}
            currentHour={currentHour}
            showHeader={true}
            index={0}
            backgroundColor="rgba(80,80,255,0.7)"
          ></HourlyForecast>
          <MultidayForecast
            weather={weather}
            dayWeather={dayWeather}
            day={day}
            month={month}
            currentHour={currentHour}
          ></MultidayForecast>
        </Box>
      </div>
    </ChakraProvider>
  );
}

export default Weather;
