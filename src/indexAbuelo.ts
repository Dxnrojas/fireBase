import { addSongs, getSongs } from './utils/Firebase'; //Importar los dos metodos
import Song, { Attribute } from './components/song/song';
import { songTypes } from './types/song';
import styles from './indexAbuelo.css';


const songInfo = {
    image: '',
    utitle: '',
    autor: '',
    album: '',
    dateadded: 0,
    duration: 0,
};

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    // Se crean los metodos para que escuchen los cambios de los inputs
    changeImage(e: any) {
        songInfo.image = e.target.value;
    }

    changeUtitle(e: any) {
        songInfo.utitle = e.target.value;
    }

    changeAutor(e: any) {
        songInfo.autor = e.target.value;
    }

    changeAlbum(e: any) {
        songInfo.album = e.target.value;
    }

    changeDateadded(e: any) {
        songInfo.dateadded = e.target.value;
    }

    changeDuration(e: any) {
        songInfo.duration = e.target.value;
    }

    // Función para manejar el envío del formulario
    submitForm() {
        console.log('Song submitted:', songInfo);
        addSongs(songInfo); 
        this.render();
    }

    // Render principal
    async render() {
        if (this.shadowRoot) {
            
            this.shadowRoot.innerHTML = '';

            const title = this.ownerDocument.createElement('h1');
            title.innerText = 'Añade tu canción';
            this.shadowRoot.appendChild(title);

            const pImage = this.ownerDocument.createElement('input');
            pImage.placeholder = 'Imagen';
            pImage.addEventListener('change', this.changeImage.bind(this));
            this.shadowRoot.appendChild(pImage);

            const pUtitle = this.ownerDocument.createElement('input');
            pUtitle.placeholder = 'Nombre de la canción';
            pUtitle.addEventListener('change', this.changeUtitle.bind(this));
            this.shadowRoot.appendChild(pUtitle);

            const pAutor = this.ownerDocument.createElement('input');
            pAutor.placeholder = 'Autor';
            pAutor.addEventListener('change', this.changeAutor.bind(this));
            this.shadowRoot.appendChild(pAutor);

            const pAlbum = this.ownerDocument.createElement('input');
            pAlbum.placeholder = 'Álbum';
            pAlbum.addEventListener('change', this.changeAlbum.bind(this));
            this.shadowRoot.appendChild(pAlbum);

            const pDateadded = this.ownerDocument.createElement('input');
            pDateadded.placeholder = 'Fecha de adición';
            pDateadded.addEventListener('change', this.changeDateadded.bind(this));
            this.shadowRoot.appendChild(pDateadded);

            const pDuration = this.ownerDocument.createElement('input');
            pDuration.placeholder = 'Duración';
            pDuration.addEventListener('change', this.changeDuration.bind(this));
            this.shadowRoot.appendChild(pDuration);

            // Botón para enviar el formulario
            const save = this.ownerDocument.createElement('button');
            save.innerText = 'Añade tu canción';
            save.addEventListener('click', this.submitForm.bind(this));
            this.shadowRoot.appendChild(save);

            // Se obtienen las canciones de Firebase de la función que se creo e el utils para traerlo
            const songs = await getSongs();


            // Hacer un foreach para pintar cada una de las canciones que estan en el firebase
            songs?.forEach((song) => {
                const container = this.ownerDocument.createElement('section');

                // Imagen
                const img = this.ownerDocument.createElement('img');
                img.src = song.image;  
                container.appendChild(img);

                const title = this.ownerDocument.createElement('h1');
                title.innerText = song.utitle; 
                container.appendChild(title);

                const autor = this.ownerDocument.createElement('p');
                autor.innerText = song.autor;  
                container.appendChild(autor);

                const album = this.ownerDocument.createElement('p');
                album.innerText = song.album;
                container.appendChild(album);

                const date_added = this.ownerDocument.createElement('p');
                date_added.innerText = song.dateadded.toString();  
                container.appendChild(date_added);

                const duration = this.ownerDocument.createElement('p');
                duration.innerText = song.duration.toString();  
                container.appendChild(duration);

                this.shadowRoot?.appendChild(container);
            });
        }
        const cssCard = this.ownerDocument.createElement('style');
      cssCard.innerHTML = styles;
      this.shadowRoot?.appendChild(cssCard);
    }
}

customElements.define('app-container', AppContainer);
export default AppContainer;