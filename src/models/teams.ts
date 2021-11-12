import { Player, PlayerData } from "./player";

/**
 * REquired data for a team
 */
export interface TeamData
{
  name: string;
  club: string;
  players: PlayerData[];
}

/**
 * Class representing a team
 */
export class Team
{
  //Name of the team
  private _name : string;
  public get name() : string {return this._name; }
  public set name(value : string) { this._name = value; }

  //Club represented by the team
  private _club: string;
  public get club(): string { return this._club; };
  public set club(value: string) { this._club = value; }

  //Players of the team
  private _players : Player[];
  public get players() : Player[] {return this._players; }

  /**
   * Constructor
   * @param data Initialization data
   */
  constructor(data?: TeamData)
  {
    this._name = "Nouvelle équipe";
    this._players = [];
    this._club = "";

    if(data)
      this.fromObject(data);
  }

  /**
   * Import data from JS object
   * @param data Data to import
   */
  fromObject(data: TeamData)
  {
    this._name = data.name ?? this.name;
    this._players = data.players?.map((dataPlayer) => { return new Player(dataPlayer); }) ?? this.players;
    this._club = data.club ?? this.club;
  }

  /**
   * Exports data to JS Object
   * @returns
   */
  toObject(): TeamData
  {
    return {
      name: this.name,
      club: this.club,
      players: this.players.map((player) => { return player.toObject(); })
    }
  }

  /**
   * Adds new player to the team
   */
  createPlayer()
  {
    this._players.push(new Player());
  }
}
