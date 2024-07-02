import express from "express";
import path from "path"
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/types/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session); // Store
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: "sessions", // mongoDb collection -Session
});

/* <1-ENTRANCE> */
// Инициализация приложения Express

const app = express();
app.use(express.static(path.join(__dirname, 'public')))

//(form data) o'qish va qayta ishlash uchun ishlatiladigan middleware funksiyasi
app.use(express.urlencoded({ extended: true }))

// JSON formatidagi so'rov tanalarini o'qiydi va ularni JavaScript ob'ektlariga aylantiradi.
//So'rov tanasidagi ma'lumotlarni req.body ichida saqlaydi.
app.use(express.json());

app.use(morgan(MORGAN_FORMAT)); //HTTP so'rovlari haqidagi ma'lumotlarni log faylga yoki konsolga yozib boradi.

/* <2-SESSIONS> */

app.use(
    session({
        secret: String(process.env.SESSION_SECRET), //sessiya uchun maxfiy kalitni belgilaydi. 
        cookie: { 
            maxAge: 360000 //1 soat //cookie`ning amal qilish muddatini sekundlarda belgilaydi
        },
        store: store,  //sessiyalarni qayerda saqlanishini belgilaydi
        resave:true, // har kerganda session vaqti yangilanadi
        saveUninitialized:true //true bo'lsa, hech qanday ma'lumot bo'lmasa ham, sessiyalar saqlanadi.
 
    }) 
);

app.use(function (req, res, next) {
    const sessionInstance = req.session as T ;
    res.locals.member = sessionInstance.member;  //Bu qator sessiyadagi member xususiyatini oladi va uni res.locals.member ga belgilaydi. Bu member ma'lumotini view (shablon)lar orqali foydalanishga imkon beradi.
    next(); //Bu metod keyingi middleware yoki so'rovni qayta ishlovchi funksiyaga o'tishni ta'minlaydi. 
});

/* <3-VIEWS> */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* <4-ROUTERS> */

app.use('/admin', routerAdmin); //BSSR( Back-end site server rendering.):EJS
app.use('/', router);  //SPA(Single Page Application):REACT 

// Middleware Design Pattern (faqat shu yerda integrasiya bolyabdi)

export default app