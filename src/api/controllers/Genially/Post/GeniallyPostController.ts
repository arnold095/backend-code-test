import { GeniallyCreator } from "@genially";
import { Request, Response } from "express";

export class GeniallyPostController {
  constructor(private readonly creator: GeniallyCreator) {}

  public async run(request: Request, response: Response): Promise<void> {
    await this.creator.run(request.body);
    response.status(201).send({});
  }
}
