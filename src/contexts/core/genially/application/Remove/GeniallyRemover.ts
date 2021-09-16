import { GeniallyRepository, GeniallyFinder, GeniallyId } from "@genially";

export class GeniallyRemover {
  private finder: GeniallyFinder;
  constructor(public repository: GeniallyRepository) {
    this.finder = new GeniallyFinder(this.repository);
  }

  public async run(id: string): Promise<void> {
    const genially = await this.finder.run(new GeniallyId(id));
    genially.hasBeenDeleted();
    await this.repository.save(genially);
  }
}
