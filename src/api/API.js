import axios from "axios"; 

export const api = axios.create({
  baseURL:
    "https://api.example.com", // Replace with your API base URL
});

