import { Given } from "@cucumber/cucumber";
import {
  GeniallyPrimitives,
  GeniallyRepository,
} from "../../../src/contexts/core/genially";
import { MockApp } from "../MockApp";
import { GeniallyMother } from "../../contexts/core/genially/Domain/GeniallyMother";

Given("I have this genially:", async (body: string) => {
  await _prepareMock(JSON.parse(body));
});

async function _prepareMock(
  params: Partial<GeniallyPrimitives>
): Promise<void> {
  const repository = MockApp.iocAdapter.get<GeniallyRepository>(
    "BackendCoreTest.Core.Genially.GeniallyRepository"
  );
  const genially = GeniallyMother.create(params);
  await repository.save(genially);
}
