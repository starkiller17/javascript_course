// Extends HTMLElement a class built-in on the browsers
class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
  }

  connectedCallback() {
    const toolTipIcon = document.createElement("span");
    toolTipIcon.textContent = " (?)"; // This is controlled by the web component
    toolTipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    toolTipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.appendChild(toolTipIcon);
  }

  // This method will be called only from inside the class
  // Is pseudo-private
  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = 'This is the tooltip text';
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer)
  }
}

// Allows to register our own custom elements
customElements.define("uc-tooltip", Tooltip);
