import express from "express";
import chalk from "chalk";
import "dotenv/config";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import mongoose from "./config/dbConnect.js";
import router from "./routes/router.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

mongoose.connection.on("connected", () => {
    console.log(chalk.bgGreenBright(chalk.black("Connected to MongoDB!")));
});

mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.use(router);

app.get("/", (req, res) => {
    res.json({
        message: "SERVER UP",
    });
});

app.listen(PORT, () => {
    console.log(chalk.bgCyan(`Server Running on PORT ${PORT}...`));
});
