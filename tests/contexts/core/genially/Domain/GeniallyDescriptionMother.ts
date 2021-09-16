import { GeniallyDescription } from "../../../../../src/contexts/core/genially";
import { MotherCreator } from "../../../shared/Domain/MotherCreator";

export class GeniallyDescriptionMother {
  public static create(name?: string): GeniallyDescription {
    return new GeniallyDescription(
      name ?? MotherCreator.random().datatype.string(120)
    );
  }
}
