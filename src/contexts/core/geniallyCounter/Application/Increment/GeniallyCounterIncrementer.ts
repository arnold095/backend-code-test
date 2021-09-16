import { EventBus } from "@sharedDomain";
import {
  GeniallyCounterFinder,
  GeniallyCounterRepository,
} from "@geniallyCounter";

export class GeniallyCounterIncrementer {
  private readonly finder: GeniallyCounterFinder;

  constructor(
    private repository: GeniallyCounterRepository,
    private eventBus: EventBus
  ) {
    this.finder = new GeniallyCounterFinder(this.repository);
  }

  public async run(): Promise<void> {
    const geniallyCounter = await this.finder.run();
    geniallyCounter.increment();
    await this.repository.save(geniallyCounter);
    await this.eventBus.publish(geniallyCounter.pullDomainEvents());
  }
}
