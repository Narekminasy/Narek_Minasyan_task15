import express from "express";
import 'dotenv/config';
import './migrate.js';
import './models/index.js';

import router from "./routes/index.js";

const app = express();
import morgan from 'morgan';
import path from 'path';

import errorHandler from './middlewares/errorHandler.js';

const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));
app.set('views', path.resolve('views'));
app.set('view engine', 'ejs');

app.use(router);

app.use(errorHandler.notFount);
app.use(errorHandler.errors);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})

