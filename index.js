import express from "express";
import "dotenv/config";
import userRouter from "./src/router/auth.routes.js";
import urlRouter from "./src/router/url.routes.js";
import { authenticationMiddleWare } from "./src/middleware/authentication.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use("/users", userRouter);
app.use(authenticationMiddleWare);
app.use("/urls", urlRouter);
app.get("/", (req, res) => {
  return res.status(200).json({ message: "The Server is up and Running" });
});

app.listen(PORT, () => {
  console.log(`The Server is Running on ${PORT}`);
});
