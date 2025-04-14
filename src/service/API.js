import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7178/api", // Ajusta si usás proxy
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;

