import axios from "axios";

const get = async (name) => {
  let url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}`;
  const res = await axios.get(url);
  return res.data;
};

export default {
  get,
};
