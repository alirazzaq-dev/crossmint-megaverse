import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

/**
 * Your unique CrossMint challenge candidate ID
 * @type {string}
 */
export const CANDIDATE_ID = process.env.CANDIDATE_ID;
export const API_BASE_URL = process.env.API_BASE_URL;
export const REQUEST_DELAY_MS = parseInt(process.env.REQUEST_DELAY_MS, 10) || 500;
