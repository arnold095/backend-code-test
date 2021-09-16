import { BaseError } from "@sharedDomain";

export class InvalidGeniallyDescription extends BaseError {
  public static readonly ERROR_CODE = 400;
  public static readonly MESSAGE = "Description cannot exceed 125 characters";

  constructor() {
    super(
      InvalidGeniallyDescription.ERROR_CODE,
      InvalidGeniallyDescription.MESSAGE
    );
  }
}
