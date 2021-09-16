import { GeniallyCounterRepository, GeniallyCounter } from "@geniallyCounter";

export class GeniallyCounterFinder {
  constructor(private readonly repository: GeniallyCounterRepository) {}

  public async run(): Promise<GeniallyCounter> {
    let counter = await this.repository.search();
    if (undefined === counter) {
      counter = GeniallyCounter.initialize();
    }
    return counter;
  }
}
