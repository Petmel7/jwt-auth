
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
const app = express();

// app.use(cors());
// app.use(cookieParser());

const start = async () => {
    try {
        await app.listen(PORT);
        console.log(`Server is running on port ${PORT}`)
    } catch (error) {
        console.log(error);
    }
}

start();