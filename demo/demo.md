# auro-dropdown

## auro-dropdown use cases

The `auro-dropdown` element should be used in situations where users may:

* select one option from a pre-defined list of options, in which case auro-dropdown will have auro-menu as a child
* select one option from an auto-complete interface, in which case auro-dropdown will have auro-autocomplete as a child



<div class="exampleWrapper">
  <button tabindex="0">a tabbable button above auro-dropdown</button>

  <auro-dropdown>
    <div slot="optionsContainer" style="display: inline-block; width: 600px; border: 1px solid black; background-color: rgb(214, 214, 214); margin: 0;">
      <ul>
        <li>a generic list</li>
        <li>this list is not an auro-component</li>
        <li>it is just a ul</li>
        <li>with some li's in it</li>
        <li>you could put auro-menu in here</li>
        <li>or auro-autocomplete</li>
        <li>the padding separating this generic list from its container is var(--auro-size-xs)</li>
      </ul>
    </div>
  </auro-dropdown>

  <button tabindex="0">a tabbable button below auro-dropdown</button>

</div>

<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

  ```html
  <auro-dropdown cssClass="testClass">Hello World!</auro-dropdown>
  ```

</auro-accordion>