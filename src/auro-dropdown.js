// Copyright (c) 2021 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import "@alaskaairux/auro-input";
import { LitElement, html, css } from "lit-element";

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

import Popover from "./popover";

/**
 * Auro-dropdown is an element that should be used in situations where users may select one option from a pre-defined list of options, or select one option from an auto-complete interface. It resembles a <select> HTML element.
 *
 * @attr {String} placement - Expects top/bottom - position for popover in relation to the element.
 * @attr {boolean} isPopoverVisible - Boolean for if popover is visible or not.
 * @slot optionsContainer - Slot for the content that will be inside of the popover.
 */
class AuroDropdown extends LitElement {
  constructor() {
    super();

    this.privateDefaults();

    this.placement = 'bottom';
  }

  /**
   * @private internal defaults
   * @returns {void}
   */
  privateDefaults() {
    this.isPopoverVisible = false;
  }

  // function to define props used within the scope of this component
  static get properties() {
    return {
      placement: { type: String },
      inputFieldText: { type: String },
      inputFieldValue: { type: String },
      inputFieldPixelWidth: { type: Number }
    };
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  firstUpdated() {
    this.trigger = this.shadowRoot.querySelector(`#auro-input`);
    this.popover = this.shadowRoot.querySelector('#popover');
    this.popper = new Popover(this.trigger, this.popover, this.placement);

    // NOTE: will be implemented later
    /*
    const elOptionHandleKeypress = (evt, options, i) => {
      console.log("elOptionHandleKeypress()", "evt.key", evt.key);
      if (evt.key.toLowerCase() === 'enter' || evt.key.toLowerCase() === 'space') {
        console.log(options[i].getAttribute('value'));
        this.shadowRoot.querySelector('auro-input').setAttribute('value', options[i].getAttribute('value'))
      }
      if (evt.key.toLowerCase() === 'escape') {
        this.toggleHide();
      }
    }
    */

    // BRENT better name
    const
      // if user clicks on <auro-dropdown>
      handleThisClick = () => {
        this.toggleVisibility();
      },
      // if a keypress happens while the <auro-dropdown> has focus
      handleThisKeyPress = (event) => {

        // is user presses a key that will toggle the list of options container visible or invisible
        if (event.key.toLowerCase() === 'enter' || event.key.toLowerCase() === ' ') {
          this.toggleVisibility();
        }

        if (event.key.toLowerCase() === 'escape') {
          this.toggleHide();
        }

      };

    this.addEventListener('keydown', handleThisKeyPress);
    this.addEventListener('click', handleThisClick);
    this.addEventListener('focus', () => {
      this.shadowRoot.querySelector('auro-input').setAttribute('class', 'manualFocus')
    });

    /*
    Future event listener for when the value of the <auro-input> is to be changed.
    this.addEventListener('changeValue', changeValue);
    */

    /*
    Future event listener for when the helper text of auro-input is to be changed.
    this.addEventListener('changeHelperText', changeHelperText);
    */

    /*
    Future event listener for when the error state of auro-dropdown is to be changed.
    this.addEventListener('changeErrorState', changeErrorState);
    */

  }

  connectedCallback() {
    super.connectedCallback();
    this.documentClickHandler = (event) => {
      const path = event.composedPath();

      // if user clicks on something other than trigger or popover, close popover
      if (this.isPopoverVisible && !path.includes(this) && !path.includes(this.popover)) {
        this.toggleHide();
      }
    };

    document.addEventListener('click', this.documentClickHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.documentClickHandler)
  }

  /**
    * @private Shows the popover if it is currently hidden and vice-versa.
    * @returns {Void} Fires an update lifecycle.
  */
  toggleVisibility() {
    if (this.isPopoverVisible) {
      this.toggleHide();
    } else {
      this.toggleShow();
    }
  }

  /**
   * @private Hides the popover
   * @returns {Void} Fires an update lifecycle.
   */
  toggleHide() {
    this.popover.removeAttribute('data-show');
    this.popper.hide();
    this.isPopoverVisible = false;

    // for any tabbable elements in the list of options, remove their tabindex attribute so that they are not tabbable anymore
    // NOTE: the code for doing so is currently not in scope for the ticket
    /*
    let options = this.shadowRoot.querySelector('[name="tooltip"]').assignedNodes()[0].querySelectorAll('li');
    for (let i = 0; i < options.length; i++) {
      options[i].removeAttribute('tabindex');
      // TODO remove the event listener, if possible. Remember, only non-anonymous functions can be removed, because you need to provide both handler type and the name of the function to remove.
    }
    */
  }

  /**
   * @private Shows the popover
   * @returns {Void} Fires an update lifecycle.
   */
  toggleShow() {
    this.inputFieldPixelWidth = this.getBoundingClientRect().width;
    this.popover.setAttribute('data-show', '');
    this.popper.show();
    this.isPopoverVisible = true;

    // make each option tabbable
    // NOTE: the code for doing so is currently not in scope for the ticket
    /*
    let options = this.shadowRoot.querySelector('[name="tooltip"]').assignedNodes()[0].querySelectorAll('li');
    for (let i = 0; i < options.length; i++) {
      options[i].setAttribute('tabindex', '0')
      if (options[i].hasAttribute("hasKeypressListener") === false) {
        options[i].addEventListener('keypress', () => elOptionHandleKeypress(event, options, i));
        options[i].setAttribute("hasKeypressListener", "true")
        }
    }
    options[0].focus();
    */
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <auro-input tabindex="0" id="auro-input" label="the label text" helptext="the help text" value="the value"></auro-input>
      <div id="popover" class="popover" style=${`width: ${this.inputFieldPixelWidth}px;`}>
        <slot name="optionsContainer"></slot>
      </div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-dropdown")) {
  customElements.define("auro-dropdown", AuroDropdown);
}