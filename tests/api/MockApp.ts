import { join } from "path";
import http, { Server } from "http";
import dotenv from "dotenv";
import { NodeDependencyInjectionIocAdapter } from "@sharedInfrastructure";
import app from "../../src/api/app";
dotenv.config({
  path: ".test.env",
});

export class MockApp {
  private _httpServer!: http.Server;
  private static _iocAdapter = new NodeDependencyInjectionIocAdapter(
    join(__dirname, "../../src/api/DependencyContainer/Container.yaml")
  );

  public static get iocAdapter(): NodeDependencyInjectionIocAdapter {
    return this._iocAdapter;
  }

  public async bootStrap(): Promise<void> {
    const port = process.env.PORT ?? 3002;
    this._httpServer = app.listen(port, () => {
      console.info(
        "  App is running at http://localhost:%d in %s mode",
        port,
        app.get("env")
      );
      console.info("  Press CTRL-C to stop\n");
    });
  }

  public httpServer(): Server {
    return this._httpServer;
  }

  public async close(): Promise<void> {
    await this._httpServer.close();
  }
}
