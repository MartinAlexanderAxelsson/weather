import axios from "axios";

const get = async (lon, lat, timezone) => {
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=${timezone}`;

  const res = await axios.get(url);
  console.log(res.data);
  return {
    current: currentWeather(res.data),
    daily: dailyWeather(res.data),
  };
};

const getWeekdays = (date) => {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return day;
};

const currentWeather = ({ current, daily }) => {
  let d = new Date(current.time.split("T")[0]);
  let time = current.time.split("T")[1];
  let day = getWeekdays(d);

  return {
    currentTemp: current.temperature_2m,
    highTemp: daily.temperature_2m_max[0],
    lowTemp: daily.temperature_2m_min[0],
    precip: current.precipitation,
    weatherCode: current.weather_code,
    day,
    time,
  };
};

const dailyWeather = ({ daily }) => {
  return daily.time.map((time, index) => {
    let d = new Date(time);
    let days = getWeekdays(d);

    return {
      timeStamp: time,
      iconCode: daily.weather_code[index],
      maxTemp: daily.temperature_2m_max[index],
      days,
    };
  });
};

export default {
  get,
};
