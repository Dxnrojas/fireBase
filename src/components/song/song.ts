import styles from './song.css';

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

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
}


  connectedCallback() {
    this.render();
}

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
      this.render();
  }

  // Método que renderiza el componente
  render() {
      if (this.shadowRoot) {
        
          this.shadowRoot.innerHTML = `
              <section class="song-card">

                  <img src="${this.image}" alt="Song image">
                  <p>Title: ${this.utitle}</p>
                  <p>Autor: ${this.autor}</p>
                  <p>Album: ${this.album}</p>
                  <p>Date Added: ${this.dateadded}</p>
                  <p>Duration: ${this.duration} mins</p>
              </section>
          `;
      }
      
      const cssCard = this.ownerDocument.createElement('style');
      cssCard.innerHTML = styles;
      this.shadowRoot?.appendChild(cssCard);
  }

  
}

customElements.define('song-component', Song);
export default Song;
