import express from "express";
const routerAdmin = express.Router(); //Модульность: Позволяет организовать маршруты в отдельных файлах.
import restaurantController from "./controllers/restaurant.controller";

/**Restaurant */
routerAdmin.get('/', restaurantController.goHome) // Adminka home page ga yonaltiradi

routerAdmin
    .get('/login', restaurantController.getLogin) 
    .post('/login', restaurantController.processLogin);

routerAdmin
    .get('/signup', restaurantController.getSignup)
    .post('/signup', restaurantController.processSignup);

routerAdmin
    .get('/logout', restaurantController.logout) 
routerAdmin
    .get('/check-me', restaurantController.checkAuthSession) 
    
/**Product */

/**User */

export default routerAdmin;