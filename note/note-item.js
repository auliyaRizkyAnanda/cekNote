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

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const styles = await getStyles();
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    this.shadowRoot.appendChild(styleElement);

    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const createdAt = this.getAttribute('createdAt');
    const noteId = this.getAttribute('id'); 

    this.shadowRoot.innerHTML = `
      <div>
        <h3>${title}</h3>
        <p>${body}</p>
        <small>${new Date(createdAt).toLocaleString()}</small>
        <button class="delete-button">Hapus</button>
      </div>
    `;

    const deleteButton = this.shadowRoot.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
this.dispatchEvent(new CustomEvent('delete-note', { detail: noteId, bubbles: true }));
    });
  }
}

customElements.define('note-item', NoteItem);

export default NoteItem;