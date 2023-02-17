import express from "express";
import { infoLogger, stream } from "./utils/logger.js";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUI, { setup } from "swagger-ui-express";

dotenv.config();
const app = express();
app.use(express.json());

//internal export
import configureRoutes from "./controllers";
import { handleErrors } from "./middlewares/handleErrors.js";
import { processRequest } from "./middlewares/index.js";

app.use(processRequest);
if (process.env.NODE_ENV != "TEST") app.use(infoLogger());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream,
  })
);
configureRoutes(app);
app.use(handleErrors);

const swaggerDocument = require(`./swagger.json`);
app.use("/api-docs", swaggerUI.serve, setup(swaggerDocument));

export default app;
