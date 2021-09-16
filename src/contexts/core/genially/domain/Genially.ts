import {
  GeniallyDescription,
  GeniallyId,
  GeniallyCreatedDomainEvent,
  GeniallyHasBeenDeleted,
  GeniallyName,
} from "@genially";
import { AggregateRoot } from "@sharedDomain";

export type GeniallyPrimitives = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt?: Date;
};

export class Genially extends AggregateRoot {
  constructor(
    private _id: GeniallyId,
    private _name: GeniallyName,
    private _description: GeniallyDescription,
    private _createdAt = new Date(),
    private _modifiedAt = new Date(),
    private _deletedAt?: Date
  ) {
    super();
  }

  public static create(
    id: GeniallyId,
    name: GeniallyName,
    description: GeniallyDescription
  ): Genially {
    const genially = new Genially(id, name, description);
    genially.record(new GeniallyCreatedDomainEvent(genially.toPrimitives()));
    return genially;
  }

  get id(): GeniallyId {
    return this._id;
  }

  public hasBeenDeleted(): void {
    this.ensureThatGeniallyIsNotDeleted();
    this._deletedAt = new Date();
    this.hasBeenModified();
  }

  private hasBeenModified(): void {
    this._modifiedAt = new Date();
  }

  public rename(name: GeniallyName): void {
    this.ensureThatGeniallyIsNotDeleted();
    this._name = name;
    this.hasBeenModified();
  }

  private ensureThatGeniallyIsNotDeleted(): void {
    if (undefined !== this._deletedAt) {
      throw new GeniallyHasBeenDeleted();
    }
  }

  public toPrimitives(): GeniallyPrimitives {
    return {
      id: this._id.value,
      name: this._name.value,
      description: this._description.value,
      createdAt: this._createdAt,
      modifiedAt: this._modifiedAt,
      deletedAt: this?._deletedAt,
    };
  }

  public static fromPrimitives(geniallyFound: GeniallyPrimitives): Genially {
    return new Genially(
      new GeniallyId(geniallyFound.id),
      new GeniallyName(geniallyFound.name),
      new GeniallyDescription(geniallyFound.description),
      geniallyFound.createdAt,
      geniallyFound.modifiedAt,
      geniallyFound.deletedAt
    );
  }
}
