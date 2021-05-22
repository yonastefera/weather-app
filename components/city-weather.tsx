import Image from "next/image";
import { useState, useEffect } from "react";

interface Weather {
  city: string;
  description: string;
  icon: string;
  temperature: number;
}

const tempConverter = (kevinUnit) => {
  return Math.floor((kevinUnit - 273) * (9 / 5) + 32);
};

const API_KEY = "970b8579bfad64998939bafd85540732";

export default function CityWeather({ city }) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      const res = await api_call.json();

      try {
        setError(null);
        setWeather({
          city: res.name.toUpperCase(),
          description: res.weather[0].main,
          icon: `http://openweathermap.org/img/w/${res.weather[0].icon}.png`,
          temperature: tempConverter(res.main.temp),
        });
      } catch {
        setError(res.message);
      }
    };

    getWeather();
  }, [city]);

  if (error) return <pre className="text-center">{error}</pre>;
  if (!weather) return <pre className="text-center">Loading...</pre>;

  return (
    <div className="flex flex-col items-center bg-white w-max m-auto py-5 px-7 rounded-lg shadow-lg">
      <h1 className="font-bold text-2xl">{weather.city}</h1>
      <Image src={weather.icon} layout="fixed" width={100} height={100} />
      <p>{weather.description}</p>
      <h1 className="py-2">
        Temperature:{" "}
        <span className="font-bold text-black text-4xl">
          {weather.temperature}&deg;F
        </span>
      </h1>
    </div>
  );
}
