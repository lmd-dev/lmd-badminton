import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import { Team } from '../../models/teams';
import { Tournament } from '../../models/tournament';
import { serviceTournaments } from '../../services/service-tournaments';

/**
 * View responsible for the teams of a tournament
 */
@Component({
  tag: 'app-teams',
  styleUrl: 'app-teams.scss',
})
export class AppTeams
{
  //Edited tournament
  @State() tournament: Tournament;

  //Teams of the tournament
  @State() teams: Team[];

  //Edited team
  @State() selectedTeam: Team | null = null;

  //Access to URL parameters
  @Prop() match: MatchResults;

  //Router history to change location
  @Prop() history: RouterHistory;

  /**
   * Loads the current tournament from its id got in the URL
   */
  private loadTournament()
  {
    this.tournament = serviceTournaments.findOne(this.match.params.id);

    if (!this.tournament) this.history.push('/');

    this.teams = [...this.tournament.teams];
  }

  /**
   * Creates a new Team
   * This method is called on createTeam event
   */
  @Listen('createTeam')
  createTeam()
  {
    this.selectedTeam = this.tournament.createTeam();
    this.teams = [...this.tournament.teams];
    serviceTournaments.update(this.tournament);
  }

  /**
   * Selects the team to edit
   * This method is called on selectTeam Event
   * @param event Data of the event
   * @see TeamList
   */
  @Listen('selectTeam')
  selectTeam(event)
  {
    this.selectedTeam = event.detail;
  }

  /**
   * Updates the collection of teams displayed by the view
   * This method is called on updateTeam event
   * @see TeamForm
   */
  @Listen('updateTeam')
  updateTeams()
  {
    this.teams = [...this.tournament.teams];
    serviceTournaments.update(this.tournament);
  }

  /**
   * Removes a team from the collection
   * This method is called on removeTeam event
   * @param event data of the event
   * @see TeamForm
   */
  @Listen('removeTeam')
  removeTeams(event)
  {
    const index = this.tournament.teams.indexOf(event.detail);

    if (index !== -1)
    {
      this.tournament.teams.splice(index, 1);
      serviceTournaments.update(this.tournament);
      this.teams = [...this.tournament.teams];
    }
  }

  /**
   * Removes a player from the edited team
   * This method is called on removePlayer event
   * @param event data of the event
   * @see PlayerForm
   */
  @Listen('removePlayer')
  removePlayer(event)
  {
    if (this.selectedTeam)
    {
      const index = this.selectedTeam.players.indexOf(event.detail);

      if (index !== -1)
      {
        this.selectedTeam.players.splice(index, 1);
        serviceTournaments.update(this.tournament);
        this.teams = [...this.tournament.teams];
      }
    }
  }

  /**
   * Loads tournament data before the creation of the component
   */
  componentWillLoad()
  {
    this.loadTournament();
  }

  /**
   * Rendering mthod of the view
   */
  render()
  {
    return (
      <Host>
        <teams-actions-bar />
        <div>
          <teams-list teams={this.teams} />
          {this.selectedTeam !== null ? <team-form data={{ team: this.selectedTeam }} /> : null}
        </div>
      </Host>
    );
  }
}
