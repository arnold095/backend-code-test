import { GeniallyDescription, GeniallyId, GeniallyName } from "@genially";

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

  get id(): GeniallyId {
    return this._id;
  }

  get name(): GeniallyName {
    return this._name;
  }

  get description(): GeniallyDescription {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt;
  }
}
