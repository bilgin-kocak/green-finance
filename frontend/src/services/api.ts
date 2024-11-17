import axios from "axios";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://8.211.9.61:3001/api";

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRaw = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
