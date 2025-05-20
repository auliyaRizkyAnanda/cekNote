import NoteItem from './note-item.js'; 
import LoadingIndicator from './loading-indicator.js'; 

const BASE_URL = 'https://notes-api.dicoding.dev/v2'; 
const loadingIndicator = document.querySelector('loading-indicator'); 

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <form id="add-note-form">
        <input type="text" id="title" placeholder="Title" required>
        <textarea id="body" placeholder="Body" required></textarea>
        <button type="submit">Add Note</button>
      </form>
    `;
    this.shadowRoot.querySelector('#add-note-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const title = this.shadowRoot.querySelector('#title').value;
      const body = this.shadowRoot.querySelector('#body').value;
      this.addNote(title, body);
    });
  }
  connectedCallback() {
  }

async addNote(title, body) {
    loadingIndicator.style.display = 'block'; 
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });
      const responseJson = await response.json();
      loadingIndicator.style.display = 'none'; 
      if (responseJson.status === 'success') {
        this.loadNotes();
      } else {
        console.error('Gagal menambahkan catatan:', responseJson.message);
        alert('Gagal menambahkan catatan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error saat menambahkan catatan:', error);
      alert('Terjadi kesalahan saat menambahkan catatan.');
      loadingIndicator.style.display = 'none'; 
    }
  }

  async loadNotes() {
    loadingIndicator.style.display = 'block'; 
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();
      loadingIndicator.style.display = 'none'; 
      if (responseJson.status === 'success') {
        this.renderNotes(responseJson.data);
      } else {
        console.error('Gagal mengambil catatan:', responseJson.message);
        this.renderNotes([]);
      }
    } catch (error) {
      console.error('Error saat mengambil catatan:', error);
      this.renderNotes([]);
      loadingIndicator.style.display = 'none';
    }
  }

  renderNotes(notes) {
    const notesList = document.getElementById('notes-list');
    if (notesList) {
      notesList.innerHTML = '';
      if (notes.length === 0) {
        notesList.innerHTML = '<p>Tidak ada catatan.</p>';
        return;
      }
      notes.forEach(note => {
        const noteElement = document.createElement('note-item');
        noteElement.setAttribute('title', note.title);
        noteElement.setAttribute('body', note.body);
        noteElement.setAttribute('createdAt', note.createdAt);
        notesList.appendChild(noteElement);
      });
    }
  }
}

customElements.define('note-form', NoteForm);

export default NoteForm;