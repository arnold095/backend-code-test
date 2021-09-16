import {
  GeniallyCounter,
  GeniallyCounterPrimitives,
  GeniallyCounterRepository,
} from "@geniallyCounter";
import { Nullable } from "@sharedDomain";
import { MongoDbClient } from "@sharedInfrastructure";

export class MongoDbGeniallyCounterRepository
  extends MongoDbClient
  implements GeniallyCounterRepository
{
  protected collection = "genially_counter";

  async save(counter: GeniallyCounter): Promise<void> {
    await this.upsert({ _id: counter.id.value }, counter.toPrimitives());
  }

  async search(): Promise<Nullable<GeniallyCounter>> {
    let counter;
    const counterFound = await this.searchOne<GeniallyCounterPrimitives>({});
    if (counterFound) {
      counter = GeniallyCounter.fromPrimitives(counterFound);
    }
    return counter;
  }
}
