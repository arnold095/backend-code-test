export class GeniallyCounterTotal {
  constructor(private _value: number) {}

  get value(): number {
    return this._value;
  }

  public increment(): GeniallyCounterTotal {
    return new GeniallyCounterTotal(this._value + 1);
  }

  static initialize(): GeniallyCounterTotal {
    return new GeniallyCounterTotal(0);
  }
}
