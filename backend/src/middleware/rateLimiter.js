import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        // if we have authentication, we can get the userID/IP to rate limit for each id/ip
        const {success} = await rateLimit.limit("my-limit-key"); // this key can be taken from a different config file for custom values
        if(!success){ // if rate limit exceeds as defined in upstash.js
            return res.status(429).json({
                message: "Too many requests"
            })
        }
        next();
    } catch (error) {
        console.log("Rate Limit error:", error);
        next(error); // pass error to next function in case there is an error with the upstash/rate limiter
    }
};

export default rateLimiter;