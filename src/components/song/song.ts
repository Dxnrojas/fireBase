import styles from './song.css'

export enum Attribute {
  'image' = 'image',
  'songtitle' = 'songtitle',
  'autorofsong' = 'autorofsong',
  'album' = 'album',
  'date_added' = 'date_added',
  'duration' = 'duration',
}

class Song extends HTMLElement {
  image?: string;
  songtitle?: string;
  autorofsong?: string;
  album?: string;
  date_added?: number;
  duration?: number;

  // Observa los cambios en estos atributos
  static get observedAttributes() {
      return Object.values(Attribute);
  }

  // Maneja los cambios en los atributos
  attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
      switch (propName) {
          case Attribute.date_added:
              this.date_added = newValue ? Number(newValue) : undefined;
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
              <section>
                  <img src="${this.image}" alt="Song image">
                  <p><strong>Title:</strong> ${this.songtitle}</p>
                  <p><strong>Autor:</strong> ${this.autorofsong}</p>
                  <p><strong>Album:</strong> ${this.album}</p>
                  <p><strong>Date Added:</strong> ${this.date_added}</p>
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

customElements.define('my-song', Song);
export default Song;