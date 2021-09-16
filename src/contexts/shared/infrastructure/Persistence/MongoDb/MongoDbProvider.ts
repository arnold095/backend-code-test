import { Db, MongoClient } from "mongodb";

export class MongoDbProvider {
  private static db: Db;
  private static mongoClient: MongoClient;

  public async db(): Promise<Db> {
    if (undefined === MongoDbProvider.db || !MongoDbProvider.mongoClient) {
      await this.connect();
    }
    return MongoDbProvider.db;
  }

  public async close(): Promise<void> {
    await MongoDbProvider.mongoClient.close();
  }

  private async connect() {
    const dataBase = process.env.MONGODB_DATABASE;
    try {
      console.info(`connecting to mongodb ${dataBase}...`);
      const client = new MongoClient(this.uri());
      MongoDbProvider.mongoClient = await client.connect();
      MongoDbProvider.db = await client.db(dataBase);
    } catch (err) {
      console.error(`connection timeout on database ${dataBase}`, err);
    }
  }

  private uri(): string {
    const {
      MONGODB_USER,
      MONGODB_PASSWORD,
      MONGODB_HOST,
      MONGODB_PORT,
      MONGODB_DATABASE_AUTH,
    } = process.env;
    return `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE_AUTH}`;
  }
}
