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
      id: params.id ?? GeniallyIdMother.create().value,
      name: params.name ?? GeniallyNameMother.create().value,
      description:
        params.description ?? GeniallyDescriptionMother.create().value,
    });
  }
}
