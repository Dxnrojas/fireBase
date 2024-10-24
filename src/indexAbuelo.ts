import { Song } from '../src/types/song'
import { addSongs } from './utils/Firebase';

const SongInfo: Song = {
    uid: "",
    image: "",
    utitle: "",
    autor: "",
    album: "",
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

    changeImage(e: any) {
		SongInfo.image = e.target.value;
	}

	changeUtitle(e: any) {
		SongInfo.utitle = e.target.value;
	}
    changeautor(e: any) {
		SongInfo.autor = e.target.value;
	}

    changealbum(e: any) {
		SongInfo.album = e.target.value;
	}

    changeDateadded(e: any) {
		SongInfo.date_added = e.target.value;
	}
    changeDuration(e: any) {
		SongInfo.duration = e.target.value;
	}

	submitForm() {
		console.log(SongInfo);
        addSongs(SongInfo);
	}

    async render() {
        if (this.shadowRoot) {
            const title = this.ownerDocument.createElement('h1');
            title.textContent = 'Agrega tu cancion';
            this.shadowRoot.appendChild(title);

			const pImage = this.ownerDocument.createElement('input');
			pImage.placeholder = 'Imagen';
			pImage.addEventListener('change', this.changeImage);
			this.shadowRoot.appendChild(pImage);

			const pUtitle = this.ownerDocument.createElement('input');
			pUtitle.placeholder = 'Titulo de la canción';
			pUtitle.addEventListener('change', this.changeUtitle);
			this.shadowRoot.appendChild(pUtitle);

            const pAutor = this.ownerDocument.createElement('input');
            pAutor.placeholder = 'Nombre del autor';
            pAutor.addEventListener('change', this.changeautor);
			this.shadowRoot.appendChild( pAutor );

            const pAlbum = this.ownerDocument.createElement('input');
            pAlbum.placeholder = 'Nombre del album';
            pAlbum.addEventListener('change', this.changealbum);
			this.shadowRoot.appendChild( pAlbum );

            const pDateadded= this.ownerDocument.createElement('input');
            pDateadded.placeholder = 'Fecha de adición';
            pDateadded.addEventListener('change', this.changeDateadded);
			this.shadowRoot.appendChild(  pDateadded );

            const pDuration = this.ownerDocument.createElement('input');
            pDuration.placeholder = 'Duración';
            pDuration.addEventListener('change', this.changeDuration);
			this.shadowRoot.appendChild(   pDuration );

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Agregar Cancion';
			save.addEventListener('click', this.submitForm);
			this.shadowRoot.appendChild(save);
        }
    }
}
customElements.define("app-container", AppContainer)   
