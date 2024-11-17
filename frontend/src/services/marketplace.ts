import api, { apiRaw } from "./api";
import axios from "axios";

export const getItems = () => api.get("/marketplace/items");
export const getItem = (itemId: string) =>
  api.get(`/marketplace/item/${itemId}`);
export const buyItem = (itemId: string) =>
  api.post(`/marketplace/buy`, { itemId });
export const getTotalPrice = (itemId: string) =>
  api.get(`/marketplace/totalPrice/${itemId}`);

export const getMetadata = (id: string) => api.get(`/nft/metadata/${id}`);

export const getAIBotResponse = (input: string) =>
  api.post("/llama", { input });
