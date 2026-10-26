import express from "express";
import "dotenv/config";
import authRoutes from "./src/router/auth.routes.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use("/users", authRoutes);
app.get("/", (req, res) => {
  return res.status(200).json({ message: "The Server is up and Running" });
});

app.listen(PORT, () => {
  console.log(`The Server is Running on ${PORT}`);
});
