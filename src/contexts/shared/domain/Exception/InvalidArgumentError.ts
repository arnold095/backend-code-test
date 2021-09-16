import { BaseError } from "@sharedDomain";

export class InvalidArgumentError extends BaseError {
  public static readonly ERROR_CODE = 400;
  public static readonly MESSAGE = "Invalid argument error";

  constructor(
    code = InvalidArgumentError.ERROR_CODE,
    msg = InvalidArgumentError.MESSAGE
  ) {
    super(code, msg);
  }
}
