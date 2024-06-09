import axios from "axios";

const BASE_URL = `${window.location.origin}/`;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

