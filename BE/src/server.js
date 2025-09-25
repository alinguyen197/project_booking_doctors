import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/index";
import connectDB from "./config/connectDB";
import morgan from "morgan";
import cors from "cors";

let app = express();

// config cors
app.use(cors({ origin: true, credentials: true }));

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Morgan http middleware log
app.use(morgan("dev"));

// set up view engine
viewEngine(app);
initWebRoutes(app);

// config database
connectDB();

let port = process.env.PORT || 8080;
app.listen(port, () => {});
