async function loadStyles() {
  try {
    const response = await fetch('styles.css');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const cssText = await response.text();
    return cssText;
  } catch (error) {
    console.error('Gagal memuat styles.css:', error);
    return '';
  }
}

let cachedStyles = null;

async function getStyles() {
  if (!cachedStyles) {
    cachedStyles = await loadStyles();
  }
  return cachedStyles;
}

class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const styles = await getStyles();
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    this.shadowRoot.appendChild(styleElement);
    this.shadowRoot.innerHTML = `
      <header>
        <h1>Notes App</h1>
      </header>
    `;
  }
}

customElements.define('app-bar', AppBar);

export default AppBar;