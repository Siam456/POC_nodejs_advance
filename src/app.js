import express from "express";
import { infoLogger, stream } from "./utils/logger.js";
import morgan from "morgan";
import dotenv from "dotenv";
import { processRequest } from "./middlewares/index.js";

dotenv.config();
const app = express();
app.use(express.json());

//internal export
import configureRoutes from "./controllers";
import { handleErrors } from "./middlewares/handleErrors.js";

app.use(processRequest);
if (process.env.NODE_ENV != "TEST") app.use(infoLogger());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream,
  })
);
configureRoutes(app);
app.use(handleErrors);

export default app;
