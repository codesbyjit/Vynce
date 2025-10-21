import { configDotenv } from "dotenv";
import Redis from "ioredis";

configDotenv();

// Convert PORT from string to number
const credentials = {
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT!),
  username: process.env.REDIS_USERNAME!,
  password: process.env.REDIS_PASS!,
};

// Create Redis clients
export const Pub = new Redis.default(credentials);
export const Sub = new Redis.default(credentials);
