import { TClient } from "../types/types";
import axios from "axios";

const fetchGeocode = async (data: TClient) => {
  console.log(process.env.API_KEY)
  const response = await axios({
    method: "get",
    url: `https://api.api-ninjas.com/v1/geocoding?city=${data.city}&country=${data.country}`,
    headers: {
      "X-Api-Key": `${process.env.API_KEY}`,
    },
  });

  return response.data
};

export default fetchGeocode;
