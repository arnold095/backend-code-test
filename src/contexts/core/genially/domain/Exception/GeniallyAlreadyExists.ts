import { BaseError } from "@sharedDomain";

export class GeniallyAlreadyExists extends BaseError {
  public static readonly ERROR_CODE = 400;
  public static readonly MESSAGE = "This genially already exists.";

  constructor() {
    super(GeniallyAlreadyExists.ERROR_CODE, GeniallyAlreadyExists.MESSAGE);
  }
}
