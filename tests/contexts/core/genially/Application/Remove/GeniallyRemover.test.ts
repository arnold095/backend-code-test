import { MockGeniallyRepository } from "../../Mock/MockGeniallyRepository";
import {
  Genially,
  GeniallyId,
  GeniallyNotExist,
  GeniallyRemover,
  GeniallyHasBeenDeleted,
} from "../../../../../../src/contexts/core/genially";
import { UuidMother } from "../../../shared/Domain/UuidMother";
import { MockEventBus } from "../../../../shared/Infrastructure/MockEventBus";

const repository = new MockGeniallyRepository();
const remover = new GeniallyRemover(repository, new MockEventBus());

describe("GeniallyRemover", () => {
  let existingGenially: Genially;

  beforeEach(() => {
    repository.generate();
    existingGenially = repository.getOne();
  });

  afterEach(() => {
    repository.clear();
  });

  it("should do a soft delete of the genially", async () => {
    expect.assertions(1);
    const id = existingGenially.id.value;
    await remover.run(id);
    const removedGenially = await repository.find(new GeniallyId(id));
    const geniallyPrimitives = removedGenially?.toPrimitives();
    expect(geniallyPrimitives?.deletedAt).toBeDefined();
  });

  it("should fail when the genially does not exist", async () => {
    expect.assertions(1);
    await expect(remover.run(UuidMother.random())).rejects.toHaveProperty(
      "code",
      GeniallyNotExist.ERROR_CODE
    );
  });

  it("should fail when the resource is tried to delete more than twice", async () => {
    expect.assertions(1);
    await remover.run(existingGenially.id.value);
    await expect(remover.run(existingGenially.id.value)).rejects.toHaveProperty(
      "code",
      GeniallyHasBeenDeleted.ERROR_CODE
    );
  });
});
