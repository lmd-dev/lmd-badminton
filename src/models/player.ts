/**
 * Required data for a player
 */
export interface PlayerData
{
  name: string;
  hasCertificate: boolean;
  hasPaid: boolean
}

/**
 * Class representing a Player
 */
export class Player
{
  private _version: number;
  public get version(): number { return this._version; };

  private _name : string;
  public get name() : string {return this._name; }
  public set name(value : string) { this._name = value; ++this._version; }

  private _hasCertificate : boolean;
  public get hasCertificate() : boolean {return this._hasCertificate; }
  public set hasCertificate(value : boolean) { this._hasCertificate = value; ++this._version; }

  private _hasPaid : boolean;
  public get hasPaid() : boolean {return this._hasPaid; }
  public set hasPaid(value : boolean) { this._hasPaid = value; ++this._version; }

  constructor(data?: PlayerData)
  {
    this._version = 0;
    this.name = "Nouveau joueur";
    this.hasCertificate = false;
    this.hasPaid = false;

    if(data)
      this.fromObject(data);
  }

  fromObject(data: PlayerData)
  {
    this._name = data.name ?? this.name;
    this._hasCertificate = data.hasCertificate ?? this.hasCertificate;
    this._hasPaid = data.hasPaid ?? this.hasPaid;
  }

  toObject(): PlayerData
  {
    return {
      name: this.name,
      hasCertificate: this.hasCertificate,
      hasPaid: this.hasPaid
    }
  }
}
