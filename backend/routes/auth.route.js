import express from "express";
import { checkAuth, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/logout', logout);
router.post('/login', login);
router.get("/check", protectRoute, checkAuth);

export default router