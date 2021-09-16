import { GeniallyRenameRequest } from "../../../../../../src/contexts/core/genially";
import { plainToClass } from "class-transformer";
import { MotherCreator } from "../../../../shared/Domain/MotherCreator";

type Params = {
  name: string;
};

export class GeniallyRenameRequestMother {
  public static create(params: Partial<Params>): GeniallyRenameRequest {
    return plainToClass(GeniallyRenameRequest, {
      name: params.name ?? MotherCreator.random().datatype.string(20),
    });
  }
}
