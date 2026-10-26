import express from "express";
import { signup } from "../controller/authController.js";
const router = express.Router();

export default router.post("/signup", signup);
