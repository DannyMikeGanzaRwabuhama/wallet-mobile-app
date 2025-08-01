import {Redis} from "@upstash/redis";
import {Ratelimit} from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(4, '60s'),
});

export default ratelimit;