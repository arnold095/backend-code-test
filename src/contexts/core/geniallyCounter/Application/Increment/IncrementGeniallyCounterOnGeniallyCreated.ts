import { DomainEventClass, DomainEventSubscriber } from "@sharedDomain";
import { GeniallyCounterIncrementer } from "@geniallyCounter";
import { GeniallyCreatedDomainEvent } from "@genially";

export class IncrementGeniallyCounterOnGeniallyCreated
  implements DomainEventSubscriber
{
  constructor(private readonly incrementer: GeniallyCounterIncrementer) {}

  subscribedTo(): DomainEventClass[] {
    return [GeniallyCreatedDomainEvent];
  }

  async on(_domainEvent: GeniallyCreatedDomainEvent): Promise<void> {
    await this.incrementer.run();
  }
}
