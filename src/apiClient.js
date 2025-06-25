import axios from "axios";
import { API_BASE_URL } from "./config.js";

/**
 * Axios instance pointing at the Megaverse API.
 * All services import and use this to make HTTP calls.
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" }
});

export default apiClient;
