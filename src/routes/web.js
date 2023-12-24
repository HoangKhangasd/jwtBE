import express from "express";
import homeController from '../controller/homeController';
import apiController from '../controller/apiController';
import foodController  from "../controller/foodController"
const router = express.Router();

/**
 * 
 * @param {*} app express app
 * 
 */
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handlCreateNewUser);
    router.post("/delete-user/:id", homeController.handleDeleteUser);
    router.get("/update-user/:id",homeController.getUpdateUserPage);
    router.post("/users/update-user", homeController.handlUpdateUser);
    router.get("/food/getAllFood",foodController.getAllFood) 

//rest api
router.get("/api/test-api", apiController.testApi);

   return app.use("/", router);
}
export default initWebRoutes;