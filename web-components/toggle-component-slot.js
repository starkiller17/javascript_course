class ToggleComponentSlot extends HTMLElement {
  constructor() {
    super();
    this._isHidden = true;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #info-box-slot {
          display: none;
        }
      </style>
      
      <button id="button-slot">Show Slot</button>
      <p id="info-box-slot">
        <slot>---Nothing---</slot>
      </p>
    `;
    this._button = this.shadowRoot.querySelector('#button-slot');
    this._infoEl = this.shadowRoot.querySelector('#info-box-slot');
    this._button.addEventListener('click', this._toggleParagraph.bind(this));
  }

  _toggleParagraph() {
    if (this._isHidden) {
      this._infoEl.style.display = 'block';
      this._button.textContent = 'Hide Slot';
    } else {
      this._infoEl.style.display = 'none';
      this._button.textContent = 'Show Slot';
    }
    this._isHidden = !this._isHidden;
  }
}

customElements.define("ui-toggle-component-slot", ToggleComponentSlot);