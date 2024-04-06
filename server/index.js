
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');

// const PORT = process.env.PORT || 5000;
// const app = express();

// // app.use(cors());
// // app.use(cookieParser());

// const start = async () => {
//     try {
//         await mongoose.connect(process.env.DB_ULR, {
//             useNewUrlparser: true,
//             useUnifiedTopologi: true
//         })
//         app.listen(PORT);
//         console.log(`Server is running on port ${PORT}`)
//     } catch (error) {
//         console.log(error);
//     }
// }

// start();

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);

const start = async () => {
    try {
        if (!process.env.DB_URL) {
            throw new Error("DB_URL is not defined in .env file");
        }

        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();

