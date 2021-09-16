import { Genially, GeniallyId } from "@genially";
import { Nullable } from "@sharedDomain";

export interface GeniallyRepository {
  save(genially: Genially): Promise<void>;

  find(id: GeniallyId): Promise<Nullable<Genially>>;

  /**
   * @deprecated use save()
   * Following a DDD-based architecture, an entity is not deleted, but changes state.
   * https://udidahan.com/2009/09/01/dont-delete-just-dont/
   */
  delete(id: GeniallyId): Promise<void>;
}
