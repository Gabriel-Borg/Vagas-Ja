<<<<<<< HEAD
// firebase.js
import { initializeApp } from "firebase/app";
import { registerUser } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Função para criar um novo usuário e salvar dados no Firestore
async function registerUser(name, email, password) {
  try {
    // Cria o usuário com e-mail e senha no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Salva os dados do usuário no Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email
    });

    console.log("Usuário registrado com sucesso:", user);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;

      await registerUser(nome, email, senha);
    });
  });
}

export { registerUser };
=======
// firebase.js
import { initializeApp } from "firebase/app";
import { registerUser } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Função para criar um novo usuário e salvar dados no Firestore
async function registerUser(name, email, password) {
  try {
    // Cria o usuário com e-mail e senha no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Salva os dados do usuário no Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email
    });

    console.log("Usuário registrado com sucesso:", user);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;

      await registerUser(nome, email, senha);
    });
  });
}

export { registerUser };
>>>>>>> 5a9a20d (alterações)
