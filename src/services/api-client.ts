import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Move baseURL here
  params: {
    api_key: "8923bd795826cf23468b0df033722e48", // Keep key inside params
  },
});

export default apiClient;
