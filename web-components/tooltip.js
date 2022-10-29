// Extends HTMLElement a class built-in on the browsers
class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Dummy tooltip text';
    this.attachShadow({ mode: 'open' });
    const template = document.querySelector('#tooltip-template');
    // innerHTML just prepares content to be added to the DOM when is accessible
    // Therefore DOM is not accessed by this property
    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-weight: normal;
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
        }

        .highlight {
          background-color: #690f0f;
        }

        ::slotted(.highlight) {
          color: red;
          border-bottom: 1px solid orange;
        }

        .icon {
          background: black;
          color: white;
          padding: 0.15rem 0.5rem;
          text-align: center;
          border-radius: 50%;
        }

        :host(.important) {
          background-color: var(--color-primary, pink);
          padding: 0.15rem;
        }

        :host-context(p) {
          font-weight: bold !important;
        }

      </style>
      <slot>Some default message</slot>
      <span class="icon">?</span>
      `;
    // Shadow DOM can be accessed before the element is added to the real DOM
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if(this.hasAttribute('text'))
      this._tooltipText = this.getAttribute('text');
    
    const toolTipIcon = this.shadowRoot.querySelector('span');
    // const toolTipIcon = document.createElement("span");
    // toolTipIcon.textContent = " (?)"; // This is controlled by the web component
    toolTipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    toolTipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(toolTipIcon);
    this.style.position = 'relative';
  }

  // This method will be called only from inside the class
  // Is pseudo-private
  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer)
  }
}

// Allows to register our own custom elements
customElements.define("uc-tooltip", Tooltip);
