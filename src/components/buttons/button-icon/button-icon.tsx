import { Component, h, Listen, Prop, Host } from "@stencil/core";
import { ButtonIconPosition } from "./button-icon-position";

/**
 * Component responsible to display a button
 */
@Component({
  tag: 'button-icon',
  styleUrl: 'button-icon.scss'
})
export class ButtonIcon {
  //Label of the button
  @Prop() label: string | null = null;

  //Icon on the button
  @Prop() icon: string | null = null;

  //Action to do on click
  @Prop() action: ((event: MouseEvent) => void) | null = null;

  //URL to go on click
  @Prop() href: string | null = null;

  //Position of the icon against the label
  @Prop() iconPosition: ButtonIconPosition = ButtonIconPosition.TOP;

  //Title visible when mouse is over the button
  @Prop() placeholder: string | null = null;

  /**
   * Realises the action of url changing on click on the button
   */
  @Listen("click")
  onClick(event: MouseEvent)
  {
    if(this.href !== null)
      location.assign(this.href);
    else if(this.action !== null)
      this.action(event);
  }

  /**
   * Rendering method of the component
   */
  render() {
    return (
      <Host title={this.placeholder} class={this.iconPosition === ButtonIconPosition.TOP ? " top" : " left" }>
        {
          this.icon !== null
          ?
            <div class={"button-icon-icon " + this.icon + (this.label === null ? " no-margin" : "")}></div>
          :
            ""
        }
        { this.label
          ? <div class="button-icon-label">{this.label}</div>
          : ""
        }
      </Host>
    );
  }
}
