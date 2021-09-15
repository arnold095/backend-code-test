import { GeniallyCreateRequest } from "../../../../../../src/contexts/core/genially";
import { plainToClass } from "class-transformer";
import { GeniallyIdMother } from "../../Domain/GeniallyIdMother";
import { GeniallyNameMother } from "../../Domain/GeniallyNameMother";
import { GeniallyDescriptionMother } from "../../Domain/GeniallyDescriptionMother";

type Params = {
  id: string;
  name: string;
  description: string;
};

export class GeniallyCreateRequestMother {
  public static create(params: Partial<Params>): GeniallyCreateRequest {
    return plainToClass(GeniallyCreateRequest, {
      id: GeniallyIdMother.create(params.id).value,
      name: GeniallyNameMother.create(params.name).value,
      description: GeniallyDescriptionMother.create(params.description).value,
    });
  }
}
