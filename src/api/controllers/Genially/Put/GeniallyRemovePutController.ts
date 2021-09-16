import { GeniallyRemover } from "@genially";
import { Request, Response } from "express";

export class GeniallyRemovePutController {
  constructor(private readonly remover: GeniallyRemover) {}

  public async run(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    await this.remover.run(id);
    response.status(204).send();
  }
}
