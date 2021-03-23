# auro-dropdown

Auro-dropdown is an element that should be used in situations where users may select one option from a pre-defined list of options, or select one option from an auto-complete interface. It resembles a <select> HTML element.

## Attributes

| Attribute          | Type      | Description                               |
|--------------------|-----------|-------------------------------------------|
| `isPopoverVisible` | `boolean` | Boolean for if popover is visible or not. |

## Properties

| Property               | Attribute              | Type     | Default  | Description                                      |
|------------------------|------------------------|----------|----------|--------------------------------------------------|
| `inputFieldPixelWidth` | `inputFieldPixelWidth` | `number` |          |                                                  |
| `inputFieldText`       | `inputFieldText`       | `string` |          |                                                  |
| `inputFieldValue`      | `inputFieldValue`      | `string` |          |                                                  |
| `placement`            | `placement`            | `String` | "bottom" | Expects top/bottom - position for popover in relation to the element. |

## Slots

| Name               | Description                                      |
|--------------------|--------------------------------------------------|
| `optionsContainer` | Slot for the content that will be inside of the popover. |
