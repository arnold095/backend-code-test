import { Nullable } from "@sharedDomain";
import { GeniallyCounter } from "@geniallyCounter";

export interface GeniallyCounterRepository {
  search(): Promise<Nullable<GeniallyCounter>>;
  save(counter: GeniallyCounter): Promise<void>;
}
