import { StringValueObject } from "@sharedDomain";
import { InvalidGeniallyName } from "@genially";

const MIN_LENGTH = 0;
const MAX_LENGTH = 125;
export class GeniallyDescription extends StringValueObject {
  public constructor(value: string) {
    super(value);
    this.ensureIsValid();
  }

  protected ensureIsValid(): void {
    if (!this.isLengthBetween(MIN_LENGTH, MAX_LENGTH)) {
      throw new InvalidGeniallyName();
    }
  }
}
