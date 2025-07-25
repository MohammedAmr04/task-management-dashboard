import axios from "axios";
import { API_BASE_URL } from "../constants";

export const clientApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
