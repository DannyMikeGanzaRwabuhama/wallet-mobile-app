import 'dotenv/config.js';
import express from 'express';
import {initDB} from "./config/db.js";
import transactionsRoute from "./routes/transactions.route.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();

app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
})