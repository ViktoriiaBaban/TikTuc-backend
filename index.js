require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routes = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware')

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
const dbUrl = process.env.DB_URL

const start =  async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(port, () => {
            console.log(`Running server on port ${port}`);
        });
    } catch (e) {
        console.log(e)
    }

}

start()