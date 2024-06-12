import express from "express";
const routerAdmin = express.Router(); //Модульность: Позволяет организовать маршруты в отдельных файлах.
import restaurantController from "./controllers/restaurant.controller";

/**Restaurant */
routerAdmin.get('/', restaurantController.goHome)

routerAdmin
    .get('/Login', restaurantController.getLogin)
    .post('/Login', restaurantController.processLogin);

routerAdmin
    .get('/signup', restaurantController.getSignup)
    .post('/signup', restaurantController.processSignup);

/**Product */

/**User */

export default routerAdmin;