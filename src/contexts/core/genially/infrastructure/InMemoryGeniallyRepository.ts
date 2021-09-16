import { Genially, GeniallyId, GeniallyRepository } from "@genially";
import { Nullable } from "@sharedDomain";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  private geniallys: Genially[] = [];

  async save(genially: Genially): Promise<void> {
    await this.delete(genially.id);
    this.geniallys.push(genially);
  }

  async find(id: GeniallyId): Promise<Nullable<Genially>> {
    return this.geniallys?.find((genially) => genially.id.equals(id));
  }

  async delete(id: GeniallyId): Promise<void> {
    this.geniallys = this.geniallys?.filter((genially) =>
      genially.id.equals(id)
    );
  }
}
