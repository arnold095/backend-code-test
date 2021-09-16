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
import { GeniallyPutController } from "./controllers/Genially/Put/GeniallyPutController";
import { GeniallyRemovePutController } from "./controllers/Genially/Put/GeniallyRemovePutController";

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
  const geniallyPutController = iocContainer.get<GeniallyPutController>(
    "GeniallyPutController"
  );
  const geniallyRemovePutController =
    iocContainer.get<GeniallyRemovePutController>(
      "GeniallyRemovePutController"
    );
  app.post(
    "/genially",
    geniallyPostController.run.bind(geniallyPostController)
  );
  app.put(
    "/genially/:id",
    geniallyPutController.run.bind(geniallyPutController)
  );
  app.put(
    "/genially/:id/delete",
    geniallyRemovePutController.run.bind(geniallyRemovePutController)
  );
};
loadRoutes(iocContainer);

export default app;
