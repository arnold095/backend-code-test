import { DomainEvent, EventBus } from "../../../../src/contexts/shared/domain";

export class MockEventBus implements EventBus {
  private publishSpy = jest.fn();

  public load(): void {
    this.publishSpy();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async publish(_domainEvents: DomainEvent[]): Promise<void> {
    return Promise.resolve(undefined);
  }
}
