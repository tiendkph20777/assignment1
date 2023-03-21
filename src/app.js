import express from "express"
import productRouter from "./routers/product"
import authRouter from "./routers/auth"
import mongoose from "mongoose"
const app = express();

//midleware giải mã dữ liệu json 
app.use(express.json());

app.use("/api", productRouter);
app.use("/api", authRouter);

mongoose.connect("mongodb://127.0.0.1:27017/AssWe17302");

export const viteNodeApp = app;