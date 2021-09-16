import { MockGeniallyRepository } from "../../Mock/MockGeniallyRepository";
import {
  Genially,
  GeniallyId,
  GeniallyNotExist,
  GeniallyHasBeenDeleted,
  GeniallyRenamer,
} from "../../../../../../src/contexts/core/genially";
import { UuidMother } from "../../../shared/Domain/UuidMother";
import { GeniallyRenameRequestMother } from "./GeniallyRenameRequestMother";
import { GeniallyMother } from "../../Domain/GeniallyMother";
import { MockEventBus } from "../../../../shared/Infrastructure/MockEventBus";

const repository = new MockGeniallyRepository();
const renamer = new GeniallyRenamer(repository, new MockEventBus());

describe("GeniallyRemover", () => {
  let existingGenially: Genially;

  beforeEach(() => {
    repository.generate();
    existingGenially = repository.getOne();
  });

  afterEach(() => {
    repository.clear();
  });

  it("should rename a genially", async () => {
    expect.assertions(1);
    const id = existingGenially.id.value;
    const params = GeniallyRenameRequestMother.create({});
    await renamer.run(id, params);
    const updatedGenially = await repository.find(new GeniallyId(id));
    const geniallyPrimitives = updatedGenially?.toPrimitives();
    expect(geniallyPrimitives?.name).toBe(params.name);
  });

  it("should fail when the genially does not exist", async () => {
    expect.assertions(1);
    const params = GeniallyRenameRequestMother.create({});
    await expect(
      renamer.run(UuidMother.random(), params)
    ).rejects.toHaveProperty("code", GeniallyNotExist.ERROR_CODE);
  });

  it("should fail because the genially is deleted", async () => {
    expect.assertions(1);
    const genially = GeniallyMother.create({ deletedAt: new Date() });
    await repository.save(genially);

    const params = GeniallyRenameRequestMother.create({});
    await expect(renamer.run(genially.id.value, params)).rejects.toHaveProperty(
      "code",
      GeniallyHasBeenDeleted.ERROR_CODE
    );
  });
});
