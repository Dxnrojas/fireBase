export enum Attribute {
  'image' = 'image',
  'utitle' = 'utitle',
  'autor' = 'autor',
  'album' = 'album',
  'dateadded' = 'dateadded',
  'duration' = 'duration',
}

class Song extends HTMLElement {
  image?: string;
  utitle?: string;
  autor?: string;
  album?: string;
  dateadded?: number;
  duration?: number;

  // Observa los cambios en estos atributos
  static get observedAttributes() {
      return Object.values(Attribute);
  }

  // Maneja los cambios en los atributos
  attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
      switch (propName) {
          case Attribute.dateadded:
              this.dateadded = newValue ? Number(newValue) : undefined;
              break;
          case Attribute.duration:
              this.duration = newValue ? Number(newValue) : undefined;
              break;
          default:
              this[propName] = newValue;
              break;
      }
      // Renderiza el componente cada vez que se actualicen los atributos
      this.render();
  }

  // Método que renderiza el componente
  render() {
      if (this.shadowRoot) {
          this.shadowRoot.innerHTML = `
              <link rel="stylesheet" href="./src/components/song/song.css">
              <section class="song-card">
                  <img src="${this.image}" alt="Song image">
                  <p><strong>Title:</strong> ${this.utitle}</p>
                  <p><strong>Autor:</strong> ${this.autor}</p>
                  <p><strong>Album:</strong> ${this.album}</p>
                  <p><strong>Date Added:</strong> ${this.dateadded}</p>
                  <p><strong>Duration:</strong> ${this.duration} mins</p>
              </section>
          `;
      }
  }

  connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.render();
  }
}

customElements.define('song-component', Song);
export default Song;
