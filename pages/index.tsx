import Link from "next/link";

import { useState } from "react";
import CityWeather from "../components/city-weather";

export default () => {
  const [city, setCity] = useState<string | null>(null);

  return (
    <div className="h-screen py-2 bg-gray-100 text-gray-600 flex flex-col items-center">
      <Link href="/about">About us</Link>

      <form
        className="flex items-center justify-center my-12"
        onSubmit={(e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);
          setCity(formdata.get("city").toString());
        }}
      >
        <span className="text-lg text-black font-semibold">
          Weather Search:
        </span>{" "}
        <input
          data-testid="weather-input"
          className="ml-3 rounded-lg p-2 border-gray-300 outline-none border-none rounded-r-none shadow-sm"
          type="text"
          name="city"
        />
        <button
          className="rounded-lg p-2 bg-blue-400 text-white border-none rounded-l-none shadow-sm"
          type="submit"
        >
          SUBMIT
        </button>
      </form>

      {city && (
        <div className="mt-4">
          <CityWeather city={city} />
        </div>
      )}
    </div>
  );
};
