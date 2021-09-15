import {
  Genially,
  GeniallyId,
  GeniallyRepository,
} from "../../../../../src/contexts/core/genially";
import { GeniallyMother } from "../Domain/GeniallyMother";
import { Nullable } from "../../../../../src/contexts/shared/domain";

export class MockGeniallyRepository implements GeniallyRepository {
  private mocks: Genially[] = [];

  public generate(params = {}, max = 10): void {
    for (let i = 0; i < max; i++) {
      this.mocks.push(GeniallyMother.create(params));
    }
  }

  public clear(): void {
    this.mocks = [];
  }

  public getOne(index = 0): Genially {
    return this.mocks[index];
  }

  async save(genially: Genially): Promise<void> {
    const geniallyMocks = this.mocks.filter((geniallyMock) =>
      geniallyMock.id.equals(genially.id)
    );
    geniallyMocks.push(genially);
    this.mocks = geniallyMocks;
  }

  async find(id: GeniallyId): Promise<Nullable<Genially>> {
    return this.mocks.find((geniallyMock) => geniallyMock.id.equals(id));
  }

  async delete(id: GeniallyId): Promise<void> {
    this.mocks = this.mocks.filter((geniallyMock) =>
      geniallyMock.id.equals(id)
    );
  }
}
