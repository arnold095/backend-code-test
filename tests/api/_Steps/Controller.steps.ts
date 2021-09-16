import request, { Response, Test } from "supertest";
import { After, Before, Given, Then } from "@cucumber/cucumber";
import assert from "assert";
import { MockApp } from "../MockApp";
import { MongoDbGeniallyRepository } from "../../../src/contexts/core/genially";
import { MongoDbGeniallyCounterRepository } from "../../../src/contexts/core/geniallyCounter";

let app: MockApp;
let _request: Test;
let _response: Response;

Before(async () => {
  app = new MockApp();
  await app.bootStrap();
});

After(async () => {
  const geniallyRepository = MockApp.iocAdapter.get<MongoDbGeniallyRepository>(
    "BackendCoreTest.Core.Genially.GeniallyRepository"
  );
  const counterRepository =
    MockApp.iocAdapter.get<MongoDbGeniallyCounterRepository>(
      "BackendCoreTest.Core.GeniallyCounter.GeniallyCounterRepository"
    );
  try {
    await geniallyRepository.drop();
    await counterRepository.drop();
  } catch (e) {}
  await app.close();
});

Given("I send a GET request to {string}", async (route: string) => {
  _request = request(app.httpServer()).get(route).send();
});

Given(
  "I send a POST request to {string} with body:",
  (route: string, body: string) => {
    _request = request(app.httpServer()).post(route).send(JSON.parse(body));
  }
);

Given(
  "I send a PUT request to {string} with body:",
  async (route: string, body: string) => {
    let dto = "";
    if (body !== "") {
      dto = JSON.parse(body);
    }
    _request = request(app.httpServer()).put(route).send(dto);
  }
);

Then("the response status code should be {int}", async (status: number) => {
  _response = await _request.expect(status);
});

Then("the response content should be:", (response: string) => {
  assert.deepStrictEqual(_response.body, JSON.parse(response));
});

Then("the response should be empty", () => {
  assert.deepStrictEqual(_response.body, {});
});
