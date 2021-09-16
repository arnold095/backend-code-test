import { Nullable } from "../../../../../src/contexts/shared/domain";
import { GeniallyCounterMother } from "../Domain/GeniallyCounterMother";
import {
  GeniallyCounter,
  GeniallyCounterRepository,
} from "../../../../../src/contexts/core/geniallyCounter";

export class MockGeniallyCounterRepository
  implements GeniallyCounterRepository
{
  private mock: Nullable<GeniallyCounter>;

  public generate(params = {}): void {
    this.mock = GeniallyCounterMother.create(params);
  }

  public getOne(): GeniallyCounter {
    return this.mock ?? GeniallyCounterMother.create({});
  }

  public clear(): void {
    this.mock = undefined;
  }

  async save(counter: GeniallyCounter): Promise<void> {
    this.mock = counter;
  }

  async search(): Promise<Nullable<GeniallyCounter>> {
    return this.mock;
  }
}
