import { GeniallyCounterId, GeniallyCounterTotal } from "@geniallyCounter";
import { AggregateRoot, Uuid } from "@sharedDomain";

export type GeniallyCounterPrimitives = {
  id: string;
  counterTotal: number;
  updatedAt: Date;
};

export class GeniallyCounter extends AggregateRoot {
  constructor(
    private _id: GeniallyCounterId,
    private counterTotal: GeniallyCounterTotal,
    private updatedAt = new Date()
  ) {
    super();
  }

  get id(): GeniallyCounterId {
    return this._id;
  }

  public static initialize(): GeniallyCounter {
    return new GeniallyCounter(
      new GeniallyCounterId(Uuid.random().value),
      GeniallyCounterTotal.initialize()
    );
  }

  public increment(): void {
    this.counterTotal = this.counterTotal.increment();
  }

  public toPrimitives(): GeniallyCounterPrimitives {
    return {
      id: this._id.value,
      counterTotal: this.counterTotal.value,
      updatedAt: this.updatedAt,
    };
  }

  public static fromPrimitives({
    id,
    counterTotal,
    updatedAt,
  }: GeniallyCounterPrimitives): GeniallyCounter {
    return new GeniallyCounter(
      new GeniallyCounterId(id),
      new GeniallyCounterTotal(counterTotal),
      updatedAt
    );
  }
}
