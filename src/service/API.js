import axios from "axios"; 

export const api = axios.create({
  baseURL:
    "https://localhost:7178/api", // Replace with your API base URL
}
);

