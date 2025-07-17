import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit('my-rate-limit');

        if (!success) {
            return res.status(429).json({
                error: "Rate limit exceeded. Please try again later."
            });
        }
        next();
    } catch (error) {
        console.error("Rate limiter error:", error);
        return res.status(500).json({
            error: "Internal server error. Please try again later."
        });
    }
}

export default rateLimiter;