import { BaseError } from "@sharedDomain";

export class GeniallyHasBeenDeleted extends BaseError {
  public static readonly ERROR_CODE = 400;
  public static readonly MESSAGE = "The Genially has been deleted";

  constructor() {
    super(GeniallyHasBeenDeleted.ERROR_CODE, GeniallyHasBeenDeleted.MESSAGE);
  }
}
