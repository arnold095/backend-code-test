import { Genially, GeniallyId } from "@genially";

export interface GeniallyRepository {
  save(genially: Genially): Promise<void>;

  find(id: GeniallyId): Promise<Genially | undefined>;

  delete(id: GeniallyId): Promise<void>;
}
