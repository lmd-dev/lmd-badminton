import { Component, h, Host, Prop, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import { Tournament } from '../../models/tournament';
import { serviceTournaments } from '../../services/service-tournaments';

/**
 * View responsible for the edited tournament
 */
@Component({
  tag: 'app-tournament',
  styleUrl: 'app-tournament.scss'
})
export class AppTournament
{
  //Edited tournament
  @State() tournament: Tournament;

  //Root HTML element of the view
  private txtTournamentName!: HTMLInputElement;

  //Router history to change url location
  @Prop() history: RouterHistory;

  //Used to get parameters from the URL
  @Prop() match: MatchResults;

  /**
   * Updates tournament data
   */
  private updateTournament()
  {
    this.tournament.name = this.txtTournamentName.value;
    serviceTournaments.update(this.tournament);
  }

  /**
   * Loads tournament data before the creation of the component
   */
  componentWillLoad()
  {
    this.tournament = serviceTournaments.findOne(this.match.params.id);

    if (!this.tournament)
      this.history.push("/");
  }

  /**
   * Rendering method of the component
   */
  render()
  {
    return (
      <Host>
        <input type="text" ref={(el) => { this.txtTournamentName = el; }} onInput={this.updateTournament.bind(this)} value={this.tournament.name} />
        <div class="tournament-actions">
          <button-icon label="Caractéristiques" icon="options" />

          <stencil-route-link url={`/tournament/${this.tournament.id}/teams`}>
            <button-icon label="Equipes" icon="users" />
          </stencil-route-link>

          <button-icon label="Phases" icon="bookmark" />
        </div>
      </Host>
    );
  }
}
