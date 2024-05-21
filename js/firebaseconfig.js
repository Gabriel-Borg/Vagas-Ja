// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Adicione mais importações conforme necessário
// import { getStorage } from "firebase/storage"; // Para o Firebase Storage, por exemplo

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9sjPE9USof5fhJX0jQ-2woFqFJAGGcLw",
  authDomain: "vagasja-bd.firebaseapp.com",
  databaseURL: "https://vagasja-bd-default-rtdb.firebaseio.com",
  projectId: "vagasja-bd",
  storageBucket: "vagasja-bd.appspot.com",
  messagingSenderId: "625603962695",
  appId: "1:625603962695:web:f65ea2b710555640e10e62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app); // Para o Firebase Storage, se necessário

// Export the services for use in other files
export { auth, db };


