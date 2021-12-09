import express from "express";
import apiRouter from "./api";

const mainRouter = express.Router();

mainRouter.use("/api", apiRouter);

export default mainRouter;