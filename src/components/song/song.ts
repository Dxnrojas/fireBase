export enum Attribute {
  "image" = "image",
  "utitle" = "utitle",
  "autor" = "autor",
  "album" = "album",
  "date_added" = "date_added",
  "duration" = "duration",
}

class Song extends HTMLElement {
  image?: string;
  utitle?: string;
  autor?: string;
  album?: string;
  date_added?: number;
  duration?: number;

  static get observedAttributes() {
    return Object.values(Attribute);
  }

  attributeChangedCallback(
    propName: Attribute,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
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
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./src/components/song/song.css">
        <section>
            <image src='${this.image}'></image>
            <b><p>${this.utitle}</p></b>
            <p>Autor:${this.autor}</p>
            <p>Album:${this.album}</p>
            <p>Date added: ${this.date_added}</p>
             <p>duration:${this.duration}</p>
        </section>
      `;
    }
  }
}
customElements.define("song-component", Song);
export default Song;
