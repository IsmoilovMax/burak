import express from "express";
import path from "path"
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/types/config";
/* <1-ENTRANCE> */
// Инициализация приложения Express

const app = express();

// Обслуживание статических файлов из папки 'public'
app.use(express.static(path.join(__dirname, 'public')))

// Разбор URL-кодированных данных (extended: true для поддержки сложных объектов)
app.use(express.urlencoded({ extended: true }))

// Разбор входящих JSON-запросов
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));

/* <2-SESSIONS> */



/* <3-VIEWS> */

// Установка каталога для шаблонов представлений
app.set('views', path.join(__dirname, 'views'))

// Установка шаблонизатора EJS
app.set('view engine', 'ejs')

/* <4-ROUTERS> */

app.use('/admin', routerAdmin);//SSR(SERVER SITE RENDERING):EJS
app.use('/', router);  //SPA:REACT 

// Middleware Design Pattern (faqat shu yerda integrasiya bolyabdi)

export default app