import { Component, h, Prop, Host, Event, EventEmitter } from '@stencil/core';
import { Player } from '../../../models/player';

/**
 * Component responsible to display and edit data of a player
 */
@Component({
  tag: 'player-row',
  styleUrl: 'player-row.scss'
})
export class PlayerRow
{
  //Player to edit
  @Prop() data: { player: Player } = null;

  //Event triggered when the player is edited
  @Event() updateTeam: EventEmitter<void>;

  //Event triggered when the player has to be removed from its team
  @Event() removePlayer: EventEmitter<Player>;

  private txtPlayerName!: HTMLInputElement;

  /**
   * Updates the name of the player and triggers the updateTeam event
   */
  private updatePlayerName()
  {
    this.data.player.name = this.txtPlayerName.value;
    this.data = { ...this.data };
    this.updateTeam.emit();
  }

  /**
   * Toggles the hasPaid property of the player
   * Triggers the updateTeam event
   */
  private toogleHasPaid()
  {
    this.data.player.hasPaid = !this.data.player.hasPaid;
    this.data = { ...this.data };
    this.updateTeam.emit();
  }

  /**
   * Toggles the hasCertificate property of the player
   * Triggers the updateTeam event
   */
  private toogleHasCertificate()
  {
    this.data.player.hasCertificate = !this.data.player.hasCertificate;
    this.data = { ...this.data };
    this.updateTeam.emit();
  }

  /**
   * Triggers the removePlayer event
   */
  private onRemovePlayer()
  {
    this.removePlayer.emit(this.data.player);
  }

  /**
   * Rendering method of the component
   */
  render()
  {
    const { player } = this.data;

    return (
      <Host>
        <input type="text" ref={(el) => { this.txtPlayerName = el; } }value={player.name} onInput={() => { this.updatePlayerName() }} />
        <button-icon class={player.hasPaid ? "success" : "danger"} icon="gift" action={() => { this.toogleHasPaid(); }} />
        <button-icon class={player.hasCertificate ? "success" : "danger"} icon="heart" action={() => { this.toogleHasCertificate(); }} />
        <button-icon icon="remove" action={() => { this.onRemovePlayer(); }} />
      </Host>
    );
  }
}
