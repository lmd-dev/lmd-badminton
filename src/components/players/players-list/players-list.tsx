import { Component, h, Prop, Host } from '@stencil/core';
import { Player } from '../../../models/player';

/**
 * Component responsible for displaying a list of players
 */
@Component({
  tag: 'players-list',
  styleUrl: 'players-list.scss'
})
export class PlayersList
{
  //Player to display
  @Prop() data: { players: Player[] } = { players: [] };

  /**
   * Rendering method of the component
   */
  render()
  {
    if (this.data.players.length === 0)
    {
      return <p>Aucun joueur</p>
    }
    else
    {
      return (
        <Host>
          {
            this.data.players.map((player) =>
            {
              return <player-row data={{ player }} />
            })
          }
        </Host>
      );
    }
  }
}
