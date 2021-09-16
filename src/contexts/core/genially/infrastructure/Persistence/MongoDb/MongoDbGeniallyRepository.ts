import { MongoDbClient } from "@sharedInfrastructure";
import {
  Genially,
  GeniallyId,
  GeniallyPrimitives,
  GeniallyRepository,
} from "@genially";
import { Nullable } from "@sharedDomain";

export class MongoDbGeniallyRepository
  extends MongoDbClient
  implements GeniallyRepository
{
  protected collection = "genially";

  async find(id: GeniallyId): Promise<Nullable<Genially>> {
    let genially;
    const geniallyFound = await this.searchOne<GeniallyPrimitives>(
      { _id: id.value },
      {}
    );
    if (geniallyFound) {
      const { deletedAt } = geniallyFound;
      const parsedGenially = {
        ...geniallyFound,
        deletedAt: deletedAt ?? undefined,
      };
      genially = Genially.fromPrimitives(parsedGenially);
    }
    return genially;
  }

  async save(genially: Genially): Promise<void> {
    await this.upsert({ _id: genially.id.value }, genially.toPrimitives());
  }

  async delete(id: GeniallyId): Promise<void> {
    throw Error(`Not implemented. ${id.value}`);
  }
}
