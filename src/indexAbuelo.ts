import { addSongs, getSongs } from './utils/Firebase';
import Song, { Attribute } from './components/song/song';
import { songTypes } from './types/song';


const songInfo = {
    image: '',
    utitle: '',
    autor: '',
    album: '',
    date_added: 0,
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

    // Funciones para manejar cambios en los inputs
    changeImage(e: any) {
        songInfo.image = e.target.value;
    }

    changesongtitle(e: any) {
        songInfo.utitle = e.target.value;
    }

    changeAutorOfSong(e: any) {
        songInfo.autor = e.target.value;
    }

    changeAlbum(e: any) {
        songInfo.album = e.target.value;
    }

    changeDateadded(e: any) {
        songInfo.date_added = e.target.value;
    }

    changeDuration(e: any) {
        songInfo.duration = e.target.value;
    }

    // Función para manejar el envío del formulario
    submitForm() {
        addSongs(songInfo); 
        this.render();
    }

    // Render principal
    async render() {
        if (this.shadowRoot) {
            // Limpiar contenido previo
            this.shadowRoot.innerHTML = '';

            // Crear el título del formulario
            const title = this.ownerDocument.createElement('h1');
            title.innerText = 'Sube tu canción';
            this.shadowRoot.appendChild(title);

            // Inputs para agregar los datos de la canción
            const pImage = this.ownerDocument.createElement('input');
            pImage.placeholder = 'Imagen';
            pImage.addEventListener('change', this.changeImage.bind(this));
            this.shadowRoot.appendChild(pImage);

            const pUtitle = this.ownerDocument.createElement('input');
            pUtitle.placeholder = 'Nombre de la canción';
            pUtitle.addEventListener('change', this.changesongtitle.bind(this));
            this.shadowRoot.appendChild(pUtitle);

            const pAutor = this.ownerDocument.createElement('input');
            pAutor.placeholder = 'Autor';
            pAutor.addEventListener('change', this.changeAutorOfSong.bind(this));
            this.shadowRoot.appendChild(pAutor);

            const pAlbum = this.ownerDocument.createElement('input');
            pAlbum.placeholder = 'Album';
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
            const saveSong = this.ownerDocument.createElement('button');
            saveSong.innerText = 'Añade tu canción';
            saveSong.addEventListener('click', this.submitForm.bind(this));
            this.shadowRoot.appendChild(saveSong);

            // Obtener las canciones de Firebase
            const songs = await getSongs();



            // Mostrar cada canción en pantalla
            songs?.forEach((song) => {
                const container = this.ownerDocument.createElement('section');

                // Crear un elemento de imagen
                const img = this.ownerDocument.createElement('img');
                img.src = song.image;  // Usamos 'src' para la imagen
                container.appendChild(img);

                // Crear un título para la canción
                const titleSong = this.ownerDocument.createElement('h1');
                title.innerText = song.utitle; 
                container.appendChild(titleSong);

                const autorSong = this.ownerDocument.createElement('p');
                autorSong.innerText = song.autor;  
                container.appendChild(autorSong);

                const album = this.ownerDocument.createElement('p');
                album.innerText = song.album;
                container.appendChild(album);

                const date_added = this.ownerDocument.createElement('p');
                date_added.innerText = song.dateadded.toString();  
                container.appendChild(date_added);

                const duration = this.ownerDocument.createElement('p');
                duration.innerText = song.duration.toString();  
                container.appendChild(duration);

                // Agregar el contenedor de la canción al shadowRoot
                this.shadowRoot?.appendChild(container);
            });
        }
    }
}

// Definir el custom element
customElements.define('app-container', AppContainer);
export default AppContainer;