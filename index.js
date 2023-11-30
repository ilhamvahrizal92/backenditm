import express from "express";
import cors from "cors";
import session from "express-session";
//import db from "./config/Database.js";
import env from "dotenv";
import UserRoute from "./Route/UserRoute.js";
import AuthRoute from "./Route/AuthRoute.js";

env.config();

const app = express();

// (async() => {
//     await db.sync();
// })();

app.use(session ({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
});