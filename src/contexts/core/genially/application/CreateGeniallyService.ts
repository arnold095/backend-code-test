import { Genially, GeniallyRepository } from "@genially";

type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export class CreateGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    const { id, name, description } = req;

    const genially = Genially.create(id, name, description);

    await this.repository.save(genially);

    return genially;
  }
}
