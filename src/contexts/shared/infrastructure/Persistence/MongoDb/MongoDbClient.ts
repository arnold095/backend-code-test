import { MongoDbProvider } from "@sharedInfrastructure";
import { Filter } from "mongodb";

export class MongoDbClient {
  protected collection!: string;

  constructor(private provider: MongoDbProvider) {}

  public useCollection(collection: string): void {
    this.collection = collection;
  }

  public async searchOne<T>(
    query: Filter<unknown>,
    projection = {}
  ): Promise<T> {
    const db = await this.provider.db();
    const result = await db
      .collection(this.collection)
      .findOne<T>(query, projection);
    return result as T;
  }

  public async upsert(
    filter: Filter<unknown>,
    document: unknown
  ): Promise<void> {
    const db = await this.provider.db();
    const updateQuery = { $set: document };
    await db
      .collection(this.collection)
      .updateOne(filter, updateQuery, { upsert: true });
  }

  public async drop(): Promise<void> {
    const db = await this.provider.db();
    await db.collection(this.collection).drop();
  }

  public async disconnect(): Promise<void> {
    await this.provider.close();
  }
}
