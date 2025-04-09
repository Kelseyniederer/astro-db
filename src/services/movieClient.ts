import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
  },
  params: {
    api_key: "8923bd795826cf23468b0df033722e48",
  },
});

export default apiClient;
