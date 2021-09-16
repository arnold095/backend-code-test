import {
  Genially,
  GeniallyId,
  GeniallyNotExist,
  GeniallyRepository,
} from "@genially";

export class GeniallyFinder {
  constructor(private repository: GeniallyRepository) {}

  public async run(id: GeniallyId): Promise<Genially> {
    const genially = await this.repository.find(id);
    if (undefined === genially) {
      throw new GeniallyNotExist();
    }
    return genially;
  }
}
