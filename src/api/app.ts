import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";

import { NodeDependencyInjectionIocAdapter } from "@sharedInfrastructure";
import { join } from "path";
import { loadRoutes } from "./routes";
import { loadEventSubscribers } from "./subscribers";

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
loadEventSubscribers(iocContainer);
loadRoutes(app, iocContainer);

export default app;
