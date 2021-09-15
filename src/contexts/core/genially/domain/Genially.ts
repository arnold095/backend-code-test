export class Genially {
  constructor(
    private _id: string,
    private _name: string,
    private _description: string,
    private _createdAt = new Date(),
    private _modifiedAt = new Date(),
    private _deletedAt?: Date
  ) {}

  public static create(
    id: string,
    name: string,
    description: string
  ): Genially {
    return new Genially(id, name, description);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
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
