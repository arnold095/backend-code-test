import { GeniallyCounterId, GeniallyCounterTotal } from "@geniallyCounter";
import { AggregateRoot, Uuid } from "@sharedDomain";

export type GeniallyCounterPrimitives = {
  id: string;
  geniallyCounter: number;
  updatedAt: Date;
};

export class GeniallyCounter extends AggregateRoot {
  constructor(
    private id: GeniallyCounterId,
    private geniallyCounter: GeniallyCounterTotal,
    private updatedAt = new Date()
  ) {
    super();
  }

  public static initialize(): GeniallyCounter {
    return new GeniallyCounter(
      new GeniallyCounterId(Uuid.random().value),
      GeniallyCounterTotal.initialize()
    );
  }

  public increment(): void {
    this.geniallyCounter = this.geniallyCounter.increment();
  }

  public toPrimitives(): GeniallyCounterPrimitives {
    return {
      id: this.id.value,
      geniallyCounter: this.geniallyCounter.value,
      updatedAt: this.updatedAt,
    };
  }

  public static fromPrimitives({
    id,
    geniallyCounter,
    updatedAt,
  }: GeniallyCounterPrimitives): GeniallyCounter {
    return new GeniallyCounter(
      new GeniallyCounterId(id),
      new GeniallyCounterTotal(geniallyCounter),
      updatedAt
    );
  }
}
