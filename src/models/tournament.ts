import Moment from "moment";
import { Team, TeamData } from "./teams";

/**
 * Required data for a tournament
 */
export interface TournamentData
{
  id?: string;
  name: string;
  date: string;
  teams: TeamData[];
}

/**
 * Class representing a tournament
 */
export class Tournament
{
  //Unique Id of the tournament
  private _id : string;
  public get id() : string {return this._id; }
  public set id(value : string) { this._id = value; }

  //Name of the tournament
  private _name : string;
  public get name() : string {return this._name; }
  public set name(value : string) { this._name = value; }

  //Day of the tournament
  private _date : Date;
  public get date() : Date {return this._date; }

  //TEams playing dureng the tournament
  private _teams : Team[];
  public get teams() : Team[] {return this._teams; }

  /**
   * Constructor
   * @param data Initialization data
   */
  constructor(data?: TournamentData)
  {
    this._id = "";
    this._name = "Nouveau tournois";
    this._date = new Date();
    this._teams = [];

    if(data)
      this.fromObject(data);
  }

  /**
   * Imports data from JS object
   * @param data Data to import
   */
  fromObject(data: TournamentData)
  {
    this._id = data.id ?? this._id;
    this._name = data.name ?? this.name;
    this._date = Moment(data.date).isValid() ? Moment(data.date).toDate() : this.date;
    this._teams = data.teams?.map((teamData) => { return new Team(teamData); }) ?? this._teams;
  }

  /**
   * Exports data to JS object
   * @returns
   */
  toObject(): TournamentData
  {
    return {
      id: this.id,
      name: this.name,
      date: Moment(this.date).format("YYYY-MM-DD"),
      teams: this.teams.map((team) => { return team.toObject(); })
    }
  }

  /**
   * Gets the number of players, any of teams
   * @returns
   */
  getTotalPlayers(): number
  {
    return this.teams.reduce((total: number, team: Team) => { return total + team.players.length; }, 0);
  }

  /**
   * Adds a new team to the tournament
   * @returns
   */
  createTeam(): Team
  {
    const newTeam = new Team();
    this._teams = [...this.teams, newTeam];

    return newTeam;
  }
}
