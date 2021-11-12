import { Component, Event, EventEmitter, h, Host } from '@stencil/core';
import { ButtonIconPosition } from '../../buttons/button-icon/button-icon-position';

/**
 * Component responsible for displaying available actions on teams
 */
@Component({
  tag: 'teams-actions-bar',
  styleUrl: 'teams-actions-bar.scss'
})
export class TeamsActionsBar
{
  //Event triggered on team creation
  @Event() createTeam: EventEmitter<void>;

  //Triggers the createTeam event when the create button is clicked
  private onCreateTeam()
  {
    this.createTeam.emit();
  }

  /**
   * rendering method of the component
   */
  render()
  {
    return (
      <Host>
        <button-icon
          label="Nouvelle équipe"
          icon="add"
          iconPosition={ButtonIconPosition.LEFT}
          action={() => { this.onCreateTeam() }}
        />
      </Host>
    );
  }
}
