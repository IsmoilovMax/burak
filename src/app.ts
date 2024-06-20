import express from "express";
import path from "path"
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/types/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";

const MongoDBStore = ConnectMongoDB(session); // Store
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: "sessions", // mongoDb collection -Session
});

/* <1-ENTRANCE> */
// Инициализация приложения Express

const app = express();
app.use(express.static(path.join(__dirname, 'public')))

// Разбор URL-кодированных данных (extended: true для поддержки сложных объектов)
app.use(express.urlencoded({ extended: true }))

// Разбор входящих JSON-запросов
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));

/* <2-SESSIONS> */
//session (option), secret # ve?
app.use(
    session({
        secret: String(process.env.SESSION_SECRET), 
        cookie: { 
            maxAge: 1000 * 60 * 24 * 7 //1 week 
        },
        store: store,
        resave:true, // har kerganda session vaqti yangilanadi
        saveUninitialized:true

    })
);


/* <3-VIEWS> */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* <4-ROUTERS> */

app.use('/admin', routerAdmin); //BSSR( Back-end site server rendering.):EJS
app.use('/', router);  //SPA(Single Page Application):REACT 

// Middleware Design Pattern (faqat shu yerda integrasiya bolyabdi)

export default app