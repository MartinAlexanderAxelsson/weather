"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import weatherData from "@/app/api/weather";
import locationData from "@/app/api/location";
import weatherCodes from "@/app/helpers/weather-codes";

export default function Main() {
  const [weather, setWeather] = useState();
  const [locationQuery, setLocationQuery] = useState();
  const [locations, setLocations] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [displayLocResults, setDisplayLocResults] = useState(false);
  const locationInput = useRef();

  const getLocation = async () => {
    try {
      await locationData.get(locationQuery).then((res) => {
        setLocations(res.results);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationSelect = (loc) => {
    getWeather(loc.longitude, loc.latitude, loc.timezone);
    setCurrentLocation(loc);
    setDisplayLocResults(false);
    locationInput.current.value = "";
  };

  const getWeather = async (lon, lat, timezone) => {
    try {
      await weatherData.get(lon, lat, timezone).then((res) => {
        setWeather(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
    setDisplayLocResults(true);
  }, [locationQuery]);

  useEffect(() => {
    let loc = {
      latitude: "59.3289",
      longitude: "18.072357",
      name: "Stockholm",
      timezone: "Europe/Stockholm",
    };
    handleLocationSelect(loc);
  }, []);

  useEffect(() => {
    console.log("currentLocation", currentLocation);
  }, [currentLocation]);

  return (
    <div className={styles.main}>
      <div className={styles.main_container}>
        <div className={styles.location_select}>
          <div className={styles.location_select_input_container}>
            <input
              ref={locationInput}
              placeholder="Enter city..."
              className={styles.location_select_input}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
          </div>
          <div
            className={styles.location_select_results}
            style={{
              display: locations && displayLocResults ? "unset" : "none",
            }}
          >
            {locations &&
              locations.map((l) => (
                <div
                  className={styles.location_select_results_item}
                  key={l.id}
                  onClick={(e) => handleLocationSelect(l)}
                >
                  {l.name}, {l.country}
                </div>
              ))}
          </div>
        </div>

        {weather && (
          <>
            <div className={styles.main_currentWeather}>
              <div className={styles.main_currentWeather_img_wrapper}>
                <img
                  className={styles.main_currentWeather_img}
                  src={weatherCodes.wc[weather.current.weatherCode]}
                />
              </div>
              <div className={styles.main_currentWeather_data}>
                <div className={styles.currentWeather_data_temp}>
                  {weather.current.currentTemp} &deg;C
                </div>
                <div className={styles.currentWeather_data_city}>
                  {currentLocation.name.toUpperCase()}
                </div>
                <div className={styles.currentWeather_data_time}>
                  {weather.current.day} {weather.current.time}
                </div>
              </div>
            </div>

            <div className={styles.main_dailyWeather}>
              {weather.daily.map((w, i) => (
                <div key={i} className={styles.main_dailyWeather_box}>
                  <img
                    className={styles.main_dailyWeather_img}
                    src={weatherCodes.wc[w.iconCode]}
                  />
                  <div className={styles.main_dailyWeather_days}>{w.days}</div>
                  <div className={styles.main_dailyWeather_temp}>
                    {w.maxTemp} &deg;C
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
