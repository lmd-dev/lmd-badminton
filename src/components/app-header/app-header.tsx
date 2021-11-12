import { Component, h, Host, Prop, State, Watch } from "@stencil/core";
import { LocationSegments, injectHistory, RouterHistory } from "@stencil/router";

/**
 * Component responsible for the header of the application
 */
@Component({
  tag: "app-header",
  styleUrl: "app-header.css"
})
export class AppHeader
{
  //Title of the header
  @Prop() heading: string = "";

  //URL of the current page
  @Prop({mutable: true}) location: LocationSegments;

  //Router history to change location
  @Prop({mutable:true}) history: RouterHistory;

  //Is the back button displayed ?
  @State() canGoBack: boolean = false;

  /**
   * Updates back button visibility depending on the url of the current page
   */
  @Watch("location")
  onLocationChange()
  {
    this.canGoBack = this.location.pathname !== "/";
  }

  /**
   * Rendering method of the component
   */
  render()
  {
    return (
      <Host>
        {
          this.canGoBack
          ?
          <button-icon id="app-header-back" icon="back" action={() => {this.history.goBack() }} style={{padding: "0"}}/>
          :
          null
        }
        <div class="app-header-title">{this.heading}</div>
      </Host>
    );
  }
}

injectHistory(AppHeader);
