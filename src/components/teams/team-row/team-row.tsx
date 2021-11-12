import { Component, h, Prop, Host, Event, Listen, EventEmitter } from '@stencil/core';
import { Team } from '../../../models/teams';

/**
 * Component responsible for displaying team data inside a TemsList
 * @see TeamsList
 */
@Component({
  tag: 'team-row',
  styleUrl: 'team-row.scss'
})
export class TeamRow
{
  //Team to display
  @Prop({ mutable: true }) data: { team: Team };

  //Event triggered when the row is clicked to select the team
  @Event() selectTeam: EventEmitter<Team>;

  //Event triggerd when the remove button is clicked to delete the team
  @Event() removeTeam: EventEmitter<Team>;

  /**
   * Triggers the selectTeam event
   * This method is called when the row is clicked
   */
  @Listen('click')
  onSelectTeam()
  {
    this.selectTeam.emit(this.data.team);
  }

  /**
   * Triggers the removeTeam event
   * @param event
   */
  private onRemoveTeam(event: Event)
  {
    event.stopPropagation();
    event.preventDefault();

    this.removeTeam.emit(this.data.team);
  }

  /**
   * Rendering method of the component
   */
  render()
  {
    const { team } = this.data;
    const nbPlayers = team.players.length;

    return (
      <Host>
        <div>
          <div class="team-row-name">{team.name}</div>
          <div class="team-row-details">
            <div class="team-row-players">{nbPlayers + " joueur" + (nbPlayers > 1 ? "s" : "")}</div>
            <div class="team-row-club">{team.club}</div>
          </div>
        </div>
        <button-icon icon="remove" action={(event) => { this.onRemoveTeam(event) }} />
      </Host>
    );
  }
}
