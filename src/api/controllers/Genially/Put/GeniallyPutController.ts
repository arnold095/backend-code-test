import { GeniallyRenamer } from "@genially";
import { Request, Response } from "express";

export class GeniallyPutController {
  constructor(private readonly renamer: GeniallyRenamer) {}

  public async run(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    await this.renamer.run(id, request.body);
    response.status(204).send();
  }
}
