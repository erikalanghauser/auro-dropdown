import {css} from 'lit-element';
export default css`*,*:before,*:after{box-sizing:border-box}@media (prefers-reduced-motion: reduce){*,*:before,*:after{animation:none !important;transition:none !important}}*:focus{outline:3px solid transparent}.js-focus-visible :focus:not(.focus-visible){outline:3px solid transparent}.util_displayInline{display:inline}.util_displayInlineBlock{display:inline-block}.util_displayBlock{display:block}.util_displayFlex{display:flex}.util_displayHidden{display:none}.util_displayHiddenVisually,.popover:not([data-show]){border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;overflow:hidden;padding:0;position:absolute;width:1px}.util_insetLg{padding:1.5rem}::slotted(*:hover){cursor:pointer}.popover{border-radius:0.375rem;border-radius:var(--auro-border-radius);background:#ffffff;background:var(--auro-color-background-lightest);box-shadow:-2px 0px 5px 2px rgba(0,0,0,0.08),0px 2px 5px 1px rgba(0,0,0,0.08);display:inline-block}.popover[data-show]{z-index:300;z-index:var(--auro-depth-tooltip);background-color:#ffffff;background-color:var(--auro-color-background-lightest)}.popover[data-popper-placement^="top"]>.arrow{bottom:-10px}.popover[data-popper-placement^="top"]>.arrow:before{transform:rotate(45deg);top:-16px;left:-6px}.popover[data-popper-placement^="bottom"]>.arrow{top:-10px}.popover[data-popper-placement^="bottom"]>.arrow:before{transform:rotate(-135deg);top:4px;right:-6px}.arrow{position:relative;margin-top:-var(--auro-size-xs)}.arrow:before{content:'';position:absolute;background:#ffffff;background:var(--auro-color-base-white);box-shadow:2px 2px 1px 0 rgba(0,0,0,0.08);width:12px;height:12px}.testClass{color:#df0b37;color:var(--auro-color-border-error-on-light);border:1px solid #df0b37;border:1px solid var(--auro-color-border-error-on-light);display:inline-block;padding:1rem;padding:var(--auro-text-body-size-default)}#container-dropdown .trigger{color:black;background-color:white;border:1px solid grey;border-radius:3px;display:inline-block;padding:10px 5px 10px 5px;cursor:pointer}#container-dropdown .trigger--isFocused{border:3px solid blue}#container-dropdown .optionsList{color:black;background-color:white;border:1px solid grey;border-radius:3px;padding:10px 5px 10px 5px;cursor:pointer;height:0;opacity:0;visibility:hidden;position:absolute;z-index:999}#container-dropdown .optionsList--isOpen{opacity:1;height:auto;visibility:visible}#container-dropdown #optionListContainer{border:2px dotted blue}
`;
