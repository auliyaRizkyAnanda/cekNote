import './styles.css'; // Pastikan path-nya benar
import './app-bar.js';
import './note-item.js';
import LoadingIndicator from './loading-indicator.js'; // Import komponen loading
import NoteForm from './note-form.js';

const BASE_URL = 'https://notes-api.dicoding.dev/v2';
const loadingIndicator = document.querySelector('loading-indicator'); // Dapatkan referensi

async function fetchNotes() {
  loadingIndicator.show(); // Menampilkan indikator loading saat memulai pengambilan data
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const responseJson = await response.json();
    loadingIndicator.hide(); // Sembunyikan indikator loading setelah data selesai dimuat
    if (responseJson.status === 'success') {
      return responseJson.data;
    } else {
      console.error('Gagal mengambil catatan:', responseJson.message);
      return [];
    }
  } catch (error) {
    console.error('Error saat mengambil catatan:', error);
    loadingIndicator.hide(); // Sembunyikan indikator loading jika terjadi error
    return [];
  }
}
// Fungsi untuk menghapus data
async function deleteNote(id) {
  loadingIndicator.show(); // Tampilkan indikator loading sebelum menghapus data
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    const responseJson = await response.json();
    loadingIndicator.hide(); // Sembunyikan indikator loading setelah proses selesai
    if (responseJson.status === 'success') {
      loadNotesAndUpdateView();
    } else {
      console.error('Gagal menghapus catatan:', responseJson.message);
      alert('Gagal menghapus catatan. Silakan coba lagi.');
    }
  } catch (error) {
    console.error('Error saat menghapus catatan:', error);
    alert('Terjadi kesalahan saat menghapus catatan.');
    loadingIndicator.hide(); // Sembunyikan indikator loading jika terjadi error
  }
}

// Fungsi untuk merender catatan
function renderNotes(notes) {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';
  if (notes.length === 0) {
    notesList.innerHTML = '<p>Tidak ada catatan.</p>';
    return;
  }
  notes.forEach(note => {
    const noteElement = document.createElement('note-item');
    noteElement.setAttribute('id', note.id);
    noteElement.setAttribute('title', note.title);
    noteElement.setAttribute('body', note.body);
    noteElement.setAttribute('createdAt', note.createdAt);
    notesList.appendChild(noteElement);
  });
}

// Fungsi untuk memuat catatan dan memperbarui tampilan
async function loadNotesAndUpdateView() {
  const notes = await fetchNotes();
  renderNotes(notes);
}

document.addEventListener('DOMContentLoaded', () => {
  loadNotesAndUpdateView();
  const notesList = document.getElementById('notes-list');
  notesList.addEventListener('delete-note', (event) => {
    const noteIdToDelete = event.detail;
    deleteNote(noteIdToDelete);
  });
});