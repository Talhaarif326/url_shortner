import express from "express";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "The Server is up and Running" });
});

app.listen(PORT, () => {
  console.log(`The Server is Running on ${PORT}`);
});
