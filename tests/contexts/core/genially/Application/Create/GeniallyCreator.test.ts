import "reflect-metadata";
import {
  Genially,
  GeniallyAlreadyExists,
  GeniallyCreator,
  GeniallyId,
  InvalidGeniallyDescription,
  InvalidGeniallyName,
} from "../../../../../../src/contexts/core/genially";
import { MockGeniallyRepository } from "../../Mock/MockGeniallyRepository";
import { GeniallyCreateRequestMother } from "./GeniallyCreateRequestMother";
import { MotherCreator } from "../../../shared/Domain/MotherCreator";
import { MockEventBus } from "../../../../shared/Infrastructure/MockEventBus";

const repository = new MockGeniallyRepository();
const creator = new GeniallyCreator(repository, new MockEventBus());

describe("GeniallyCreator", () => {
  let existingGenially: Genially;

  beforeEach(() => {
    repository.generate();
    existingGenially = repository.getOne();
  });

  afterEach(() => {
    repository.clear();
  });

  it("should successfully create a new Genially", async () => {
    expect.assertions(3);
    const params = GeniallyCreateRequestMother.create({});
    await creator.run(params);
    const geniallyCreated = await repository.find(new GeniallyId(params.id));
    const createdPrimitives = geniallyCreated?.toPrimitives();
    expect(createdPrimitives?.id).toBe(params.id);
    expect(createdPrimitives?.name).toBe(params.name);
    expect(createdPrimitives?.description).toBe(params.description);
  });

  it("should fail when genially already exists", async () => {
    expect.assertions(1);
    const params = GeniallyCreateRequestMother.create({
      id: existingGenially.id.value,
    });
    await expect(creator.run(params)).rejects.toHaveProperty(
      "code",
      GeniallyAlreadyExists.ERROR_CODE
    );
  });

  it("should fail when genially name is invalid", async () => {
    expect.assertions(1);
    const params = GeniallyCreateRequestMother.create({
      name: MotherCreator.random().datatype.string(200),
    });
    await expect(creator.run(params)).rejects.toHaveProperty(
      "code",
      InvalidGeniallyName.ERROR_CODE
    );
  });

  it("should fail when genially description is invalid", async () => {
    expect.assertions(1);
    const params = GeniallyCreateRequestMother.create({
      description: MotherCreator.random().datatype.string(200),
    });
    await expect(creator.run(params)).rejects.toHaveProperty(
      "code",
      InvalidGeniallyDescription.ERROR_CODE
    );
  });
});
