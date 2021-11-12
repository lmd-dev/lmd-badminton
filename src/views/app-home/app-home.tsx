import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Tournament } from '../../models/tournament';
import { serviceTournaments } from '../../services/service-tournaments';

/**
 * View responsible for home page
 */
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  //Tournaments collection to display
  @State() tournaments: Tournament[] = [];

  //Router history that permits to switch on another page of the app
  @Prop() history: RouterHistory;

  /**
   * Loads tournaments data
   */
  private loadTournaments()
  {
    this.tournaments = [...serviceTournaments.findAll()];
  }

  /**
   * Creates new tournament
   */
  private createTournament()
  {
    const tournament = new Tournament();
    serviceTournaments.insert(tournament);
    this.tournaments = [...this.tournaments, tournament];

    this.history.push(`/tournament/${tournament.id}`);
  }

  /**
   * Removes the given tournament from the collection
   * This methis is called on removeTournament event
   * @param event Data of the event
   * @see TournementList
   */
  @Listen("removeTournament")
  removeTournament(event: CustomEvent)
  {
    serviceTournaments.remove(event.detail);
    this.loadTournaments();
  }

  /**
   * Loads tournaments before componenet creation
   */
  componentWillLoad()
  {
    this.loadTournaments();
  }

  /**
   * Rendering method of the component
   */
  render() {
    return (
      <Host>
        <button-icon id="new-tournament" label="Nouveau tournoi" icon="add" action={() => { this.createTournament(); }}></button-icon>
        {
          this.tournaments.length
          ?
          <tournaments-list tournaments={this.tournaments} />
          :
          null
        }
      </Host>
    );
  }
}
