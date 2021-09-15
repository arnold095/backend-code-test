import { Genially } from "@genially";

export interface GeniallyRepository {
  save(genially: Genially): Promise<void>;

  find(id: string): Promise<Genially | undefined>;

  delete(id: string): Promise<void>;
}
