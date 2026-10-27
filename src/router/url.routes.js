import express from "express";
import {
  createShortUrl,
  getShortUrl,
  getUserUrls,
} from "../controller/url.controller.js";
import { authenticationMiddleWare } from "../middleware/authentication.middleware.js";

const router = express.Router();

router.post("/shorten", authenticationMiddleWare, createShortUrl);
router.get("/user/urls", authenticationMiddleWare, getUserUrls);

router.get("/:shortCode", getShortUrl);

export default router;
