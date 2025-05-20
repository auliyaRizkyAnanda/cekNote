const template = document.createElement('template');
template.innerHTML = `
  <style>
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000; /* Ensure it's on top */
    }

    .spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  <div class="loading-overlay">
    <div class="spinner"></div>
  </div>
`;

class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  show() {
    this.style.display = 'block';
  }

  hide() {
    this.style.display = 'none';
  }
  updateProgress(percentage) {
    const progressBar = this.shadowRoot.querySelector('progress');
    progressBar.value = percentage; // Update progress
  }
}

customElements.define('loading-indicator', LoadingIndicator);

export default LoadingIndicator;