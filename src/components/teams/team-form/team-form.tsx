import { Component, h, Prop, Host, Event, EventEmitter } from '@stencil/core';
import { Team } from '../../../models/teams';
import { ButtonIconPosition } from '../../buttons/button-icon/button-icon-position';

/**
 * Component responsible for displaying the edit form of a team
 */
@Component({
  tag: 'team-form',
  styleUrl: 'team-form.scss'
})
export class TeamForm
{
  //Team to edit
  @Prop() data: { team: Team }

  //Event triggerd when the team is updated
  @Event() updateTeam: EventEmitter<void>;

  //Text input to edit the name of the team
  txtName!: HTMLInputElement;

  //Text input to edit the club represented by the team
  txtClub!: HTMLInputElement;

  /**
   * Updates the team and trigger the updateTeam event
   */
  private onUpdateTeam()
  {
    this.data.team.name = this.txtName.value;
    this.data.team.club = this.txtClub.value;

    this.data = { ...this.data };

    this.updateTeam.emit();
  }

  /**
   * Adds a new player to the team
   */
  private addPlayer()
  {
    this.data.team.createPlayer();
    this.data = { ...this.data };

    this.updateTeam.emit();
  }

  /**
   * Rendering method of the component
   */
  render()
  {
    const { team } = this.data;

    return (
      <Host>
        <div class="field">
          <label>Nom de l'équipe</label>
          <input type="text" id="txt-team-name" ref={(el) => this.txtName = el as HTMLInputElement} value={team.name} onInput={() => this.onUpdateTeam()} />
        </div>

        <div class="field">
          <label>Nom du club représenté</label>
          <input type="text" id="txt-team-club" ref={(el) => this.txtClub = el as HTMLInputElement} value={team.club} onInput={() => this.onUpdateTeam()} />
        </div>

        <h2>Joueurs</h2>
        <button-icon label="Nouveau joueur" icon="add" iconPosition={ButtonIconPosition.LEFT} action={() => { this.addPlayer(); }} />
        <players-list data={{ players: team.players }} />
      </Host>
    );
  }
}
