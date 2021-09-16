import { MockEventBus } from "../../../../shared/Infrastructure/MockEventBus";
import { MockGeniallyCounterRepository } from "../../Mock/MockGeniallyCounterRepository";
import {
  GeniallyCounter,
  GeniallyCounterIncrementer,
} from "../../../../../../src/contexts/core/geniallyCounter";

const repository = new MockGeniallyCounterRepository();
const incrementer = new GeniallyCounterIncrementer(
  repository,
  new MockEventBus()
);

describe("GeniallyRemover", () => {
  let existingGenially: GeniallyCounter;

  beforeEach(() => {
    repository.generate();
    existingGenially = repository.getOne();
  });

  afterEach(() => {
    repository.clear();
  });

  it("should increment the counter", async () => {
    expect.assertions(1);
    const primitivesBeforeUpdate = existingGenially.toPrimitives();
    await incrementer.run();
    const updatedCounter = await repository.search();
    const updatedPrimitives = updatedCounter?.toPrimitives();
    expect(updatedPrimitives?.counterTotal).toBe(
      primitivesBeforeUpdate.counterTotal + 1
    );
  });
});
