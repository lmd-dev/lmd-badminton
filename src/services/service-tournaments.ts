import { Tournament, TournamentData } from "../models/tournament";
import { v4 as uuidv4 } from "uuid";

/**
 * Service responsible for managing tournaments
 */
class ServiceTournaments
{
  /**
   * Finds and returns all stored tournaments
   * @returns stored tournaments
   */
  findAll(): Tournament[]
  {
    return this.load();
  }

  /**
   * Finds a tournament from its unique id
   * @param id Id of the tournement to find
   * @returns The found tournamenent, undefined else
   */
  findOne(id: string): Tournament
  {
    return this.load().find((tournament) => { return tournament.id === id; });
  }

  /**
   * Inserts the given tournament in the stored collection
   * @param tournament Tournament to insert
   */
  insert(tournament: Tournament)
  {
    tournament.id = uuidv4();

    const tournaments = this.load();
    tournaments.push(tournament);
    this.save(tournaments);
  }

  /**
   * Updates the given tournament in the stored collection
   * @param tournament
   */
  update(tournament: Tournament)
  {
    const tournaments = this.load();
    const tournamentToUpdate = tournaments.find((t) => { return t.id === tournament.id });

    if (tournamentToUpdate)
    {
      tournamentToUpdate.fromObject(tournament.toObject())
      this.save(tournaments);
    }
  }

  /**
   * Removes the given tournament from the stored collection
   * @param tournament
   */
  remove(tournament: Tournament)
  {
    const tournaments = this.load();
    const index = tournaments.findIndex((t) => { return t.id === tournament.id });

    if (index !== -1)
    {
      tournaments.splice(index, 1);
      this.save(tournaments);
    }
  }

  /**
   * Loads the tournaments stored collection
   * @returns
   */
  private load(): Tournament[]
  {
    let tournaments: Tournament[] = [];

    const storedData = localStorage.getItem("bad-tournaments");

    if (storedData)
    {
      tournaments = JSON.parse(storedData).map((tournamentData: TournamentData) => { return new Tournament(tournamentData); });
    }

    return tournaments;
  }

  /**
   * Saves the given tournaments as the stored collection
   * @param tournaments
   */
  private save(tournaments: Tournament[])
  {
    localStorage.setItem("bad-tournaments", JSON.stringify(tournaments.map((tournament) => { return tournament.toObject(); })));
  }
}

export const serviceTournaments = new ServiceTournaments();
