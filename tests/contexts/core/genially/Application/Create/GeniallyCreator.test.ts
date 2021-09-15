import "reflect-metadata";
import {
  Genially,
  GeniallyAlreadyExists,
  GeniallyCreator,
  GeniallyId,
} from "../../../../../../src/contexts/core/genially";
import { MockGeniallyRepository } from "../../Mock/MockGeniallyRepository";
import { GeniallyCreateRequestMother } from "./GeniallyCreateRequestMother";

const repository = new MockGeniallyRepository();
const creator = new GeniallyCreator(repository);

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
});
