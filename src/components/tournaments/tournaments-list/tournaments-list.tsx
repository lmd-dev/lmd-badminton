import { Component, h, Host, Prop } from "@stencil/core";
import { Tournament } from "../../../models/tournament";

/**
 * Component responsible for displaying tournaments list
 */
@Component({
  tag: "tournaments-list",
  styleUrl: "tournaments-list.scss"
})
export class TournamentsList
{
  //Tournaments to display
  @Prop() tournaments: Tournament[] = [];

  /**
   * Rendering method of the component
   */
  render()
  {
    return (
      <Host>
        {
          this.tournaments.map((tournament) => {
            return (
              <stencil-route-link url={`/tournament/${tournament.id}`}>
                <tournament-row tournament={tournament} />
              </stencil-route-link>
            )
          })
        }
      </Host>
    );
  }
}
