import { Component, h, Host } from '@stencil/core';

/**
 * Vie responsible for the root of the app
 */
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  /**
   * Rendering function of the view
   */
  render() {
    return (
      <Host>
        <app-header heading="LMD Bad Tournament" />
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/tournament/:id" component="app-tournament" exact={true} />
              <stencil-route url="/tournament/:id/teams" component="app-teams" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </Host>
    );
  }
}
