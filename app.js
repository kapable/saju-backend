const express = require('express');
const dotenv = require('dotenv');
// const db = require('./models');
const morgan = require('morgan');
const session = require('express-session');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const todayRouter = require('./routes/today');

dotenv.config();

const app = express();
// db.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log('DB Connected...');
//     })
//     .catch(console.error);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

if (process.env.NODE_ENV === 'production') {
    app.use(cors({
        origin: [process.env.SERVICE_FRONT_URL,],
        credentials: true,
    }));

    app.enable('trust proxy');
    app.use(morgan('combined'));
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(hpp());

    app.use(session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
        proxy: true,
        cookie: {
            httpOnly: true,
            secure: true,
            domain: '.ktestone.com'
        }
    }));
} else {
    app.use(cors({
        origin: [process.env.DEV_FRONT_URL],
        credentials: true,
    }));
    app.use(morgan('dev'));

    app.use(session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
    }));
}

app.get('/', (req, res) => {
    res.send('Welcome to SAJU API!');
});

app.use('/today', todayRouter);

app.listen(3065, () => {
    console.log('-- SAJU API is listening on http://localhost:3065 --');
});