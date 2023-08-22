import { app } from "./app";
import uri from "./config/mongoose";

import mongoose from 'mongoose';
mongoose
  .connect(uri)
  .then(() => {
    console.info("DB_CONNECTED", "SUCCESS");
  })
  .catch((error: any) => {
    console.error("DB_CONNECTION_FAILED", error);
  });

const server = app.listen(app.get("port"), async () => {
  console.info("APP_START", `App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
});

process.on("uncaughtException", (error) => {
  console.error("UNHANDLED_REJECTION", error);
});

export default server;
