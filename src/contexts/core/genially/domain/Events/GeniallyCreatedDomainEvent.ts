import { DomainEvent } from "@sharedDomain";
import { GeniallyPrimitives } from "@genially";

export class GeniallyCreatedDomainEvent extends DomainEvent {
  private static readonly _eventName = "genially_has_been_created";

  constructor(
    readonly body: GeniallyPrimitives,
    eventId?: string,
    occurredOn?: Date
  ) {
    super(body.id, GeniallyCreatedDomainEvent.eventName, eventId, occurredOn);
  }

  public static get eventName(): string {
    return this._eventName;
  }

  public static fromPrimitives(
    body: GeniallyPrimitives,
    eventId: string,
    occurredOn: Date
  ): GeniallyCreatedDomainEvent {
    return new GeniallyCreatedDomainEvent(body, eventId, occurredOn);
  }

  public toPrimitives(): GeniallyPrimitives {
    return this.body;
  }
}
