import express from "express";
import { createShortUrl } from "../controller/url.controller.js";
import { ensuredAuthentication } from "../middleware/authentication.middleware.js";

const router = express.Router();

router.post("/shorten", ensuredAuthentication, createShortUrl);

export default router;
