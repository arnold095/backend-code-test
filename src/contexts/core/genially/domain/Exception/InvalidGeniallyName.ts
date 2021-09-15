import { BaseError } from "@sharedDomain";

export class InvalidGeniallyName extends BaseError {
  public static readonly ERROR_CODE = 400;
  public static readonly MESSAGE =
    "The genially name must be between three and twenty characters";

  constructor() {
    super(InvalidGeniallyName.ERROR_CODE, InvalidGeniallyName.MESSAGE);
  }
}
