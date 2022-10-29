class ToggleComponent extends HTMLElement {
  constructor() {
    super();
    this._paragraphText = '---Nothing---';
    this._isHidden = true;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #info-box {
          display: none;
        }
      </style>
      
      <button>Show</button>
      <p id="info-box">Default Text</p>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('text'))
      this._paragraphText = this.getAttribute('text');
    
    const button = this.shadowRoot.querySelector('button');
    const infoEl = this.shadowRoot.querySelector('p');
    
    infoEl.textContent = this._paragraphText;
    button.addEventListener('click', this._toggleParagraph.bind(this, button, infoEl));
  }

  _toggleParagraph(button, infoEl, event) {
    if (this._isHidden) {
      infoEl.style.display = 'block';
      button.textContent = 'Hide';
      this._isHidden = false;
    } else {
      infoEl.style.display = 'none';
      button.textContent = 'Show';
      this._isHidden = true;
    }
  }
}

customElements.define("ui-toggle-component", ToggleComponent);