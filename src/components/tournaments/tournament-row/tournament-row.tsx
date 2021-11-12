import { Component, h, Prop, Host, Event, EventEmitter } from '@stencil/core';
import { Tournament } from '../../../models/tournament';
import Moment from "moment";

/**
 * Component responsible for displaying a row of a tournament list
 */
@Component({
  tag: 'tournament-row',
  styleUrl: 'tournament-row.scss'
})
export class TournamentRow
{
  //Tournament to display
  @Prop() tournament: Tournament;

  //Event triggered when the tournament is removed
  @Event() removeTournament: EventEmitter<Tournament>;

  /**
   * Triggers removeTournament event when removing button is clicked
   * @param event data of the event
   */
  onRemoveTournament(event: Event)
  {
    event.stopPropagation();
    event.preventDefault();

    this.removeTournament.emit(this.tournament);
  }

  /**
   * Rendering method of the component
   * @returns
   */
  render()
  {
    const totalPlayers = this.tournament.getTotalPlayers();

    return (
      <Host>
        <div>
          <div class="tournament-row-name">{this.tournament.name}</div>
          <div class="tournament-row-details">
            <div>{Moment(this.tournament.date).format("DD/MM/YYYY")}</div>
            <div>{totalPlayers} participant{totalPlayers > 1 ? "s" : ""}</div>
          </div>
        </div>
        <div>
          <button-icon class="btn-tournament-remove" icon="remove" action={(event) => { this.onRemoveTournament(event); }} />
        </div>
      </Host>
    );
  }
}
