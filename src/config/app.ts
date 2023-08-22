import dotenv from "dotenv";
dotenv.config();

export const environment = process.env.NODE_ENV;
export const appConfig = {
  port: process.env.PORT || 3000,
  serviceName: process.env.SERVICE_NAME || "APP_SERVICE",
};

export const dbConfig = {
  uri:'mongodb+srv://bite-speed:bite-speed@bitespeed.uj8mksl.mongodb.net/?retryWrites=true&w=majority'
};
export const xApiKey = process.env["X-API-KEY"] || "khgdhagsldfljahsgdf";

