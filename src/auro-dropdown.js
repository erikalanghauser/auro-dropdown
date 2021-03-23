// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import "@alaskaairux/auro-input";
import { LitElement, html, css } from "lit-element";

// Import touch detection lib
import "focus-visible/dist/focus-visible.min.js";
import styleCss from "./style-css.js";

import Popover from "./popover";

/**
 * Popover attaches to an element and displays on hover/blur.
 *
 * @attr {String} placement - Expects top/bottom - position for popover in relation to the element.
 * @attr {String} for - Defines an `id` for an element in the DOM to trigger on hover/blur.
 * @attr {boolean} isPopoverVisible - Boolean for if popover is visible or not.
 * @slot - Default unnamed slot for the use of popover content
 * @slot trigger - Slot for entering the trigger element into the scope of the shadow DOM
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
      for: { type: String },
      inputFieldText: { type: String },
      inputFieldValue: { type: String },
      inputPixelWidth: { type: Number }
    };
  }

  static get styles() {
    return css`
      ${styleCss},
    `;
  }

  /**
  * @private Internal method for managing buildless environment variable
  * @returns {Void} Fires an update lifecycle.
  */
  patchBuildless() {
    // patch for buildless environments
    const code = 'var process = {env: {}};',
      script = document.createElement('script');

    script.type = 'text/javascript';
    try {
      script.appendChild(document.createTextNode(code));
    } catch (err) {
      script.text = code;
    }

    return script;
  }

  firstUpdated() {
    this.trigger = this.shadowRoot.querySelector(`#auro-input`);
    this.popover = this.shadowRoot.querySelector('#popover');
    this.popper = new Popover(this.trigger, this.popover, this.placement);

    // NOTE: this code is currently not in scope for the ticket
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

    const actionToggle = () => {
      if (this.isPopoverVisible) {
        this.toggleHide();

        // for any tabbable elements in the list of options, remove their tabindex attribute so that they are not tabbable anymore
        // NOTE: the code for doing so is currently not in scope for the ticket
        /*
        let options = this.shadowRoot.querySelector('[name="tooltip"]').assignedNodes()[0].querySelectorAll('li');
        for (let i = 0; i < options.length; i++) {
          options[i].removeAttribute('tabindex');
          // TODO remove the event listener, if possible. Remember, only non-anonymous functions can be removed, because you need to provide both handler type and the name of the function to remove.
        }
        */
      } else {
        this.toggleShow();

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
    },

      // if user clicks on <auro-dropdown>
      handleThisClick = () => {
        actionToggle();
      },

      // if a keypress happens while the <auro-dropdown> has focus
      handleThisKeyPress = (event) => {

        // is user presses a key that will toggle the list of options container visible or invisible
        if (event.key.toLowerCase() === 'enter' || event.key.toLowerCase() === ' ') {
          actionToggle();
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
    * @returns {Void} Fires an update lifecycle.
  */
  toggle() {
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
  }

  /**
   * @private Shows the popover
   * @returns {Void} Fires an update lifecycle.
   */
  toggleShow() {
    this.inputPixelWidth = this.getBoundingClientRect().width;
    this.popover.setAttribute('data-show', '');
    this.popper.show();
    this.isPopoverVisible = true;
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html`
      <auro-input slot="trigger" tabindex="0" id="auro-input" label="the label text" helptext="the help text"
        value="the value"></auro-input>
      
      <div id="popover" class="popover" style=${`width: ${this.inputPixelWidth}px;`}>
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