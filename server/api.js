import { config } from "dotenv";
import { URL, fileURLToPath } from "url";
import path from "path";

// Get the current file's URL and convert it to a path
const currentFileURL = new URL(import.meta.url);
const currentFilePath = fileURLToPath(currentFileURL);

// Derive the __dirname from the currentFilePath
const __dirname = path.dirname(currentFilePath);

const envPath = path.resolve(__dirname, "..", ".env");
config({ path: envPath });

export const unsplashAccessKey = process.env.API_KEY;

export async function getApi(url) {
  let fetchResponse = await fetch(url);
  let result = await fetchResponse.json();
  return result;
}
