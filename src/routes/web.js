import express from "express";
import homeController from '../controller/homeController';
import JWTAction from '../middleware/JWTAction';

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
    router.all('*', JWTAction.isLogin);

    router.get("/", (req, res) => {
        return res.send("Hello world with Eric & HoiDanIT")
    })
    router.get("/health", (req, res) => {
        return res.status(200).json({
            messeage: 'ok'
        })
    })
    router.post("/get-data-by-url", homeController.getDataByURL);


    return app.use("/", router);
}

export default initWebRoutes;