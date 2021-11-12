import { Component, h, Host, Prop } from '@stencil/core';
import { Team } from '../../../models/teams';

/**
 * Conponent responsible for displaying teams list
 * @see TeamRow
 */
@Component({
  tag: 'teams-list',
  styleUrl: 'teams-list.scss'
})
export class TeamsList
{
  //List of teams to display
  @Prop({ mutable: true }) teams: Team[];

  /**
   * Rendering method of the component
   */
  render()
  {
    if (this.teams.length === 0)
    {
      return <p>Aucun équipe</p>
    }
    else
    {
      return (
        <Host>
          {
            this.teams.map(team => <team-row data={{ team }} />)
          }
        </Host>
      );
    }
  }
}
