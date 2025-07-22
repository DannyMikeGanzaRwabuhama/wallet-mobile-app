import 'dotenv/config.js';
import express from 'express';
import {initDB} from "./config/db.js";
import transactionsRoute from "./routes/transactions.route.js";
import rateLimiter from "./middleware/rateLimiter.js";
import job from "./config/cron.js";

const app = express();

// Start the cron job
if (process.env.NODE_ENV === "production") job.start();

app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({ status: "OK" });
});

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
})