import express from "express";
import articlRouter from "./routes/articleRoute";
import authorRouter from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.use("/", articlRouter);
app.use("/user", authorRouter);

app.listen(3000, () => console.log("start"));
