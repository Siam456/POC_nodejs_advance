import configureUserController from "./userController.js";
import routes from "./routes";

const configure = (app) => {
  app.use("/api", routes);
};

export default configure;
