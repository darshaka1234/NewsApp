import express from "express";
import articleRouter from "./routes/articleRoute";
import authorRouter from "./routes/authRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/", articleRouter);
app.use("/user", authorRouter);

const PORT = process.env.PORT || 6000;
console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
