if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const userRoutes = require('./routes/users');
const collectionRoutes = require('./routes/collections');
const secret = process.env.SECRET || 'thisisasecret';

const app = express();

const sessionOptions = {
    name: 'userSessionCookie',
    secret: secret,
    secure: true,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

const corsOptions = {
    credentials: true,
    origin: [process.env.CORS_ORIGIN_1]
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session()); 

app.use('/', userRoutes);
app.use('/collection', collectionRoutes);

app.use((err, req, res, next) => {
    let { status = 400, message = "Something went wrong on the server side." } = err;
    res.status(status).send(message);
});

app.listen(3000, () => {
    console.log('Listening...')
})