let db: any;

const getFirestoreInstance = async () => {
	if (!db) {

    // Import the functions you need from the SDKs you need
    const { initializeApp } = await import ('firebase/app');
    const { getFirestore } = await import ('firebase/firestore'); //Importar los modulos
  

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyCnuBmK9mZm0L8pJ1jY6FNrMH8EkeP6Mnk",
      authDomain: "labfirebase-20645.firebaseapp.com",
      projectId: "labfirebase-20645",
      storageBucket: "labfirebase-20645.appspot.com",
      messagingSenderId: "41663412175",
      appId: "1:41663412175:web:f08d1c51f820d17a6c44ba"
    };
    // Initialize Firebase

      const app = initializeApp(firebaseConfig);
      db = getFirestore(app); //Una funcion dentro de otra 
  }

	return db;

};

export const addSongs = async (product: any) => { //Metodo para anadir las canciones
	try {
		const db = await getFirestoreInstance();
		const { collection, addDoc } = await import('firebase/firestore');

		const where = collection(db, 'songs');  //Anadir a la coleccion de songs porque no esta creada
		await addDoc(where, product); //addDoc recibe dos parametros, donde y que quiero guardar
		console.log('Se añadió con exito');
	} catch (error) {
		console.error('Error adding document', error);
	}
};

export const getSongs = async () => { //Metodo para traer las canciones o productos
	try {
		const db = await getFirestoreInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'songs');
		const querySnapshot = await getDocs(where); //Firebase toma una foto de lo que hay en la coleccion y lo pinta, entonces quiero traer todos los documentos y le pongo en plural
		const data: any[] = [];

		querySnapshot.forEach((doc) => { //Necesito retorar el arreglo pero con datos mas especificos como el documento o el contenido solamente por eso se crea un segundo arreglo para guardar esa data(contenido del doc)
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};