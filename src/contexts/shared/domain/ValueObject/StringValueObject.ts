import { InvalidArgumentError } from "@sharedDomain";

export abstract class StringValueObject {
  constructor(private _value: string) {
    this.ensureIsValid();
  }

  protected ensureIsValid(): void {
    if (!this._value && this._value !== "") {
      throw new InvalidArgumentError();
    }
  }

  public get value(): string {
    return this._value;
  }

  public isEmpty(): boolean {
    return this._value === "";
  }

  public isLengthBetween(min: number, max: number): boolean {
    return min <= this._value.length && this._value.length <= max;
  }

  public isEquals(value: string): boolean {
    return this._value === value;
  }
}
