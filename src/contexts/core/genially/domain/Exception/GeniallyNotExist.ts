import { BaseError } from "@sharedDomain";

export class GeniallyNotExist extends BaseError {
  public static ERROR_CODE = 404;
  public static MESSAGE = "Genially does no exist";
  constructor() {
    super(GeniallyNotExist.ERROR_CODE, GeniallyNotExist.MESSAGE);
  }
}
