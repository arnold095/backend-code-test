import { v4, validate } from "uuid";
import { InvalidArgumentError } from "@sharedDomain";

export class Uuid {
  public constructor(private _value: string) {
    this.ensureIsValidUuid();
  }

  public static random(): Uuid {
    return new Uuid(v4());
  }

  private ensureIsValidUuid(): void {
    const msg = `<${this.constructor.name}> does not allow the value <${this.value}>`;
    if (!validate(this.value)) {
      throw new InvalidArgumentError(501, msg);
    }
  }

  public equals(other: Uuid): boolean {
    return this.value === other.value;
  }

  public get value(): string {
    return this._value;
  }
}
