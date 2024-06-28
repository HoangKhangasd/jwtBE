import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
import foodController from "../controller/foodController";
import cateController from "../controller/cateController";
import handleImg from "../controller/HandleImg";

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
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/users/update-user", homeController.handlUpdateUser);
  ///////////////////////////
  router.get("/food/getAllFood", foodController.getAllFood);
  router.post("/food/CreateFood", foodController.CreateFood);
  router.put("/food/UpdateFood/:idFood", foodController.UpdateFood);
  router.post("/food/getFoodLoai", foodController.getFoodCate);
  router.delete("/food/DeleteFood/:idF", foodController.DeleteFood);
  ///////////////////////////
  router.get("/cate/getAllCate", cateController.getAllCate);
  router.post("/cate/CreateCate", cateController.CreateCate);
  router.put("/cate/UpdateCate/:id", cateController.UpdateCate);
  router.delete("/cate/DeleteCate/:id", cateController.DeleteCate);
  //////////////////////////api.js
  router.get("/api/Img", handleImg.getImg);

  //rest api
  router.get("/api/test-api", apiController.testApi);

  return app.use("/", router);
};
export default initWebRoutes;
