import { GeniallyName } from "../../../../../src/contexts/core/genially";
import { MotherCreator } from "../../../shared/Domain/MotherCreator";

export class GeniallyNameMother {
  public static create(name?: string): GeniallyName {
    return new GeniallyName(name ?? MotherCreator.random().datatype.string(20));
  }
}
