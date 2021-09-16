import { GeniallyId } from "../../../../../src/contexts/core/genially";
import { UuidMother } from "../../../shared/Domain/UuidMother";

export class GeniallyIdMother extends UuidMother {
  static create(id?: string): GeniallyId {
    return new GeniallyId(id ?? UuidMother.random());
  }
}
