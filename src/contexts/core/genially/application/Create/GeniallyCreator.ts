import {
  Genially,
  GeniallyCreateRequest,
  GeniallyDescription,
  GeniallyId,
  GeniallyName,
  GeniallyRepository,
  GeniallyAlreadyExists,
} from "@genially";
import { EventBus } from "@sharedDomain";

export class GeniallyCreator {
  public constructor(
    private readonly repository: GeniallyRepository,
    private readonly eventBus: EventBus
  ) {}

  public async run(request: GeniallyCreateRequest): Promise<void> {
    const id = new GeniallyId(request.id);
    await this.ensureThatGeniallyDoesNotExist(id);
    const genially = Genially.create(
      id,
      new GeniallyName(request.name),
      new GeniallyDescription(request.description)
    );
    await this.repository.save(genially);
    await this.eventBus.publish(genially.pullDomainEvents());
  }

  private async ensureThatGeniallyDoesNotExist(id: GeniallyId) {
    const genially = await this.repository.find(id);
    if (undefined !== genially) {
      throw new GeniallyAlreadyExists();
    }
  }
}
