import express from "express";
import { appConfig } from "./config";
import cors from "cors";
import { requestId } from "./middleware/request-id";
import { AppRouter } from "./router";
import { NotFoundError } from "./util/app-error";
import { errorHandler } from "./middleware/error-handler";
export const app: express.Application = express();
app.use(express.json());
app.use(requestId);


app.use(cors());
app.use("/api", AppRouter);
app.use((_req, _res, next) => next(new NotFoundError()));
app.use(errorHandler);
app.set("port", appConfig.port);
