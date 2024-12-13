import express from "express";
import pagesController from "../controllers/pagesController.js";
import apiController from "../controllers/apiController.js";
const router = express.Router();

router.get('/', pagesController.index);
router.get(
    '/login', 
    (...props) => apiController.userVerifyAndRedirect(...props, null, "/user"), 
    pagesController.login
);
router.get(
    '/register', 
    (...props) => apiController.userVerifyAndRedirect(...props, null, "/user"), 
    pagesController.register
);
router.get(
    '/user', 
    (...props) => apiController.userVerifyAndRedirect(...props, "/login"), 
    pagesController.user
);

export default router;