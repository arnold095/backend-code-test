import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import { NodeDependencyInjectionIocAdapter } from "@sharedInfrastructure";
import { join } from "path";
import { IocAdapter } from "@sharedDomain";
import { GeniallyPostController } from "./controllers/Genially/Post/GeniallyPostController";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Primary app routes
const iocContainer = new NodeDependencyInjectionIocAdapter(
  join(__dirname, "./DependencyContainer/Container.yaml")
);

const loadRoutes = (iocContainer: IocAdapter): void => {
  app.get("/", healthController.check);
  const geniallyPostController = iocContainer.get<GeniallyPostController>(
    "GeniallyPostController"
  );
  app.post(
    "/genially",
    geniallyPostController.run.bind(geniallyPostController)
  );
};
loadRoutes(iocContainer);

export default app;
