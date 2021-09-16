import {
  GeniallyDescription,
  GeniallyId,
  GeniallyHasBeenDeleted,
  GeniallyName,
} from "@genially";

export type GeniallyPrimitives = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt?: Date;
};

export class Genially {
  constructor(
    private _id: GeniallyId,
    private _name: GeniallyName,
    private _description: GeniallyDescription,
    private _createdAt = new Date(),
    private _modifiedAt = new Date(),
    private _deletedAt?: Date
  ) {}

  public static create(
    id: GeniallyId,
    name: GeniallyName,
    description: GeniallyDescription
  ): Genially {
    return new Genially(id, name, description);
  }

  get id(): GeniallyId {
    return this._id;
  }

  public hasBeenDeleted(): void {
    if (undefined !== this._deletedAt) {
      throw new GeniallyHasBeenDeleted();
    }
    this._deletedAt = new Date();
    this.hasBeenModified();
  }

  private hasBeenModified(): void {
    this._modifiedAt = new Date();
  }

  public toPrimitives(): GeniallyPrimitives {
    return {
      id: this._id.value,
      name: this._name.value,
      description: this._description.value,
      createdAt: this._createdAt,
      modifiedAt: this._modifiedAt,
      deletedAt: this._deletedAt,
    };
  }
}
