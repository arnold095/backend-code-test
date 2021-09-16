import {
  GeniallyFinder,
  GeniallyId,
  GeniallyName,
  GeniallyRenameRequest,
  GeniallyRepository,
} from "@genially";
import { EventBus } from "@sharedDomain";

export class GeniallyRenamer {
  private finder: GeniallyFinder;
  constructor(
    public repository: GeniallyRepository,
    private readonly eventBus: EventBus
  ) {
    this.finder = new GeniallyFinder(this.repository);
  }

  public async run(id: string, request: GeniallyRenameRequest): Promise<void> {
    const genially = await this.finder.run(new GeniallyId(id));
    genially.rename(new GeniallyName(request.name));
    await this.repository.save(genially);
    await this.eventBus.publish(genially.pullDomainEvents());
  }
}
