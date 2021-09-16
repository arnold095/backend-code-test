import {
  GeniallyCounter,
  GeniallyCounterId,
  GeniallyCounterPrimitives,
  GeniallyCounterTotal,
} from "../../../../../src/contexts/core/geniallyCounter";
import { UuidMother } from "../../../shared/Domain/UuidMother";

export class GeniallyCounterMother {
  public static create(
    primitives: Partial<GeniallyCounterPrimitives>
  ): GeniallyCounter {
    return new GeniallyCounter(
      new GeniallyCounterId(primitives.id ?? UuidMother.random()),
      new GeniallyCounterTotal(primitives.counterTotal ?? 0),
      new Date()
    );
  }
}
