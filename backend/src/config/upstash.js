import {Ratelimit}  from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(), // read token and URL from the .evn file
    limiter: Ratelimit.slidingWindow(100,"60 s") // limit to 10 requests per 20 seconds (typically around 100/min)
});

export default rateLimit;