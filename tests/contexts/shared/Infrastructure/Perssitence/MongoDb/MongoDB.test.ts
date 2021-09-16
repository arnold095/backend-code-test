import "reflect-metadata";

import {
  MongoDbClient,
  MongoDbProvider,
} from "../../../../../../src/contexts/shared/infrastructure";
import { MotherCreator } from "../../../Domain/MotherCreator";
import { UuidMother } from "../../../Domain/UuidMother";

let mongoDbClient: MongoDbClient;
const existingId = UuidMother.random();

beforeAll(async () => {
  mongoDbClient = new MongoDbClient(new MongoDbProvider());
  mongoDbClient.useCollection("testing");
  const objectToSave = {
    ...MotherCreator.random().datatype.array(),
    ...{ _id: existingId },
  };
  await mongoDbClient.upsert({ _id: existingId }, objectToSave);
});

afterAll(async () => {
  await mongoDbClient.drop();
  await mongoDbClient.disconnect();
});

describe("MongoDb", () => {
  it("[FindOne] Should find results", async () => {
    expect.assertions(1);
    const foundObject = await mongoDbClient.searchOne({ _id: existingId }, {});
    expect(foundObject).toHaveProperty("_id", existingId);
  });

  it("[InsertOne] Should can save a object", async () => {
    expect.assertions(1);
    const id = UuidMother.random();
    const objectToSave = {
      ...MotherCreator.random().datatype.array(),
      ...{ _id: id },
    };
    await expect(
      mongoDbClient.upsert({ _id: id }, objectToSave)
    ).resolves.toBeUndefined();
  });

  it("[UpdateOne] Should can update a object", async () => {
    expect.assertions(2);
    const newValues = {
      updateValues: MotherCreator.random().datatype.array(),
    };
    await expect(
      mongoDbClient.upsert({ _id: existingId }, newValues)
    ).resolves.toBeUndefined();
    const updatedObject = await mongoDbClient.searchOne(
      { _id: existingId },
      {}
    );
    expect(updatedObject).toHaveProperty(
      "updateValues",
      newValues.updateValues
    );
  });
});
