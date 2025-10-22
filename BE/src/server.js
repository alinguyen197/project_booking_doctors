import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/index';
import connectDB from './config/connectDB';
import morgan from 'morgan';
import cors from 'cors';

let app = express();

// config cors
app.use(cors({ origin: true, credentials: true }));

// Add headers before the routes are defined
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Morgan http middleware log
app.use(morgan('dev'));

// set up view engine
viewEngine(app);
initWebRoutes(app);

// config database
connectDB();

let port = process.env.PORT || 8080;
app.listen(port, () => {});
