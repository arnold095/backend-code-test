import {
  Genially,
  GeniallyPrimitives,
} from "../../../../../src/contexts/core/genially";
import { GeniallyIdMother } from "./GeniallyIdMother";
import { GeniallyDescriptionMother } from "./GeniallyDescriptionMother";
import { GeniallyNameMother } from "./GeniallyNameMother";

export class GeniallyMother {
  public static create({
    id,
    name,
    description,
    createdAt,
    modifiedAt,
    deletedAt,
  }: Partial<GeniallyPrimitives>): Genially {
    return new Genially(
      GeniallyIdMother.create(id),
      GeniallyNameMother.create(name),
      GeniallyDescriptionMother.create(description),
      createdAt ?? new Date(),
      modifiedAt ?? new Date(),
      deletedAt
    );
  }
}
