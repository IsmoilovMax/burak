import express from "express";
const routerAdmin = express.Router(); //Модульность: Позволяет организовать маршруты в отдельных файлах.
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";

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
routerAdmin
    .get('/product/all', 
        restaurantController.verifyRestaurant,
        productController.getAllProducts); 
routerAdmin
    .post("/product/create", 
        restaurantController.verifyRestaurant,
        productController.createNewProduct);
routerAdmin
    .post("/product/:id", 
        restaurantController.verifyRestaurant,
        productController.updateChosenProduct);


/**User */

export default routerAdmin;