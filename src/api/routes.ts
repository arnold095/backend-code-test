import { IocAdapter } from "@sharedDomain";
// Controllers (route handlers)
import * as healthController from "./controllers/health";
import { GeniallyPostController } from "./controllers/Genially/Post/GeniallyPostController";
import { GeniallyPutController } from "./controllers/Genially/Put/GeniallyPutController";
import { GeniallyRemovePutController } from "./controllers/Genially/Put/GeniallyRemovePutController";
import { Express } from "express";

export const loadRoutes = (app: Express, iocContainer: IocAdapter): void => {
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
