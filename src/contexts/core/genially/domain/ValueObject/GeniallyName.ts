import { StringValueObject } from "@sharedDomain";
import { InvalidGeniallyName } from "../Exception/InvalidGeniallyName";

const MIN_LENGTH = 3;
const MAX_LENGTH = 20;
export class GeniallyName extends StringValueObject {
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
