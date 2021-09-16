import { DomainEventSubscriber, IocAdapter } from "@sharedDomain";
import { InMemorySyncEventBus } from "@sharedInfrastructure";
import { ContainerBuilder, Definition } from "node-dependency-injection";

export const loadEventSubscribers = (iocAdapter: IocAdapter): void => {
  const eventBus = iocAdapter.get<InMemorySyncEventBus>("Shared.EventBus");
  const subscribers: DomainEventSubscriber[] = [];
  const subscriberDefinitions = iocAdapter
    .container<ContainerBuilder>()
    .findTaggedServiceIds("DomainEventSubscriber") as Map<string, Definition>;
  subscriberDefinitions.forEach((_value: Definition, key: string) => {
    subscribers.push(iocAdapter.get(key));
  });
  eventBus.addSubscribers(subscribers);
  eventBus.load();
};
