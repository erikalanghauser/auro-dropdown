import { fixture, html, expect, waitUntil, elementUpdated } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/auro-dropdown.js';

describe('auro-dropdown', () => {
  it('clicking the auro-dropdown when it\`s closed will open the options container', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <div slot="blah" style="display: inline-block; width: 500px;">content for dropdown</div>
      </auro-dropdown>
    `);

    const popover = el.shadowRoot.querySelector('#popover');
    expect(popover.hasAttribute('data-show')).to.equal(false);

    el.click();

    expect(popover.hasAttribute('data-show')).to.equal(true);
  });

  it('clicking the auro-dropdown when it\`s open will close the options container', async () => {
    const el = await fixture(html`
    <auro-dropdown>
      <div slot="blah" style="display: inline-block; width: 500px;">content for dropdown</div>
    </auro-dropdown>
  `);

    const popover = el.shadowRoot.querySelector('#popover');
    expect(popover.hasAttribute('data-show')).to.equal(false);

    el.click();

    expect(popover.hasAttribute('data-show')).to.equal(true);

    el.click();
    expect(popover.hasAttribute('data-show')).to.equal(false);
  });

  it('pressing a non-eligible button while the auro-dropdown has focus will NOT toggle the open/close state of the options container', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <div slot="blah" style="display: inline-block; width: 500px;">content for dropdown</div>
      </auro-dropdown>
    `);

    const popover = el.shadowRoot.querySelector('#popover');
    expect(popover.hasAttribute('data-show')).to.equal(false);

    el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }));

    expect(popover.hasAttribute('data-show')).to.equal(false);
  });

  it('pressing the Enter button while the auro-dropdown has focus will toggle the open/close state of the options container', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <div slot="blah" style="display: inline-block; width: 500px;">content for dropdown</div>
      </auro-dropdown>
    `);

    const popover = el.shadowRoot.querySelector('#popover');
    expect(popover.hasAttribute('data-show')).to.equal(false);

    el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));

    expect(popover.hasAttribute('data-show')).to.equal(true);

    el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
    expect(popover.hasAttribute('data-show')).to.equal(false);
  });

  it('pressing the Space button while the auro-dropdown has focus will toggle the open/close state of the options container', async () => {
    const el = await fixture(html`
      <auro-dropdown>
        <div slot="blah" style="display: inline-block; width: 500px;">content for dropdown</div>
      </auro-dropdown>
    `);

    const popover = el.shadowRoot.querySelector('#popover');
    expect(popover.hasAttribute('data-show')).to.equal(false);

    el.dispatchEvent(new KeyboardEvent('keydown', { 'key': ' ' }));

    expect(popover.hasAttribute('data-show')).to.equal(true);

    el.dispatchEvent(new KeyboardEvent('keydown', { 'key': ' ' }));
    expect(popover.hasAttribute('data-show')).to.equal(false);
  });

  it('the auro-dropdown is tabbable', async () => {
    const el = await fixture(html`
      <button id="decoyButton1">decoy button 1</button>
      <auro-dropdown>
        <div slot="blah" style="display: inline-block; width: 500px;">content for dropdown</div>
      </auro-dropdown>
      <button id="decoyButton1">decoy button 1</button>
    `);

    expect(document.querySelector('auro-dropdown').shadowRoot.querySelector('auro-input').getAttribute('tabindex') === "0").to.equal(true);
  
    /*
    BRENT: I tried to do an elaborate interaction sequence of click button 1, tab onto auro-dropdown, press Enter,
    tab off of auro-dropdown...but I can't get it to work.

    console.log("document.querySelector('#decoyButton1')", document.querySelector('#decoyButton1'));
    document.querySelector('#decoyButton1').click();
    console.log('document.activeElement woof', document.activeElement)


    const auroDropdown = document.querySelector('auro-dropdown');
    expect(document.activeElement === auroDropdown).to.equal(false);

    document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Tab' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
    expect(document.activeElement === auroDropdown).to.equal(true);
    */
  });

});
