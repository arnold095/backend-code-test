import { Genially, GeniallyId } from "@genially";
import { Nullable } from "@sharedDomain";

export interface GeniallyRepository {
  save(genially: Genially): Promise<void>;

  find(id: GeniallyId): Promise<Nullable<Genially>>;

  delete(id: GeniallyId): Promise<void>;
}
