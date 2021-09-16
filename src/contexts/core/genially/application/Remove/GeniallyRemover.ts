import { GeniallyRepository, GeniallyFinder, GeniallyId } from "@genially";
import { EventBus } from "@sharedDomain";

export class GeniallyRemover {
  private finder: GeniallyFinder;
  constructor(
    public repository: GeniallyRepository,
    private readonly eventBus: EventBus
  ) {
    this.finder = new GeniallyFinder(this.repository);
  }

  public async run(id: string): Promise<void> {
    const genially = await this.finder.run(new GeniallyId(id));
    genially.hasBeenDeleted();
    await this.repository.save(genially);
    await this.eventBus.publish(genially.pullDomainEvents());
  }
}
