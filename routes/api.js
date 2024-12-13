import express from "express";
import apiController from "../controllers/apiController.js";
const router = express.Router();

router.post('/login', apiController.userLogin);
router.post('/register', apiController.userRegister);
router.get('/verify', apiController.userVerify);

export default router;