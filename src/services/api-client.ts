import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.rawg.io/api", // Move baseURL here
  params: {
    key: "d4bc14d117024523afe8039d1c3454b3", // Keep key inside params
  },
});

export default apiClient;
