const firebaseConfig = {
  apiKey: "AIzaSyD9sjPE9USof5fhJX0jQ-2woFqFJAGGcLw",
  authDomain: "vagasja-bd.firebaseapp.com",
  databaseURL: "https://vagasja-bd-default-rtdb.firebaseio.com",
  projectId: "vagasja-bd",
  storageBucket: "vagasja-bd.appspot.com",
  messagingSenderId: "625603962695",
  appId: "1:625603962695:web:f65ea2b710555640e10e62"
};

    
 firebase.initializeApp(firebaseConfig);

 function grava() {
  var nome=  document.getElementById('nome').value;
  var email= document.getElementById('email').value;
  var senha=  document.getElementById('senha').value;
 
 
  var referencia =firebase.database().ref("Contatos/"+nome); 
    
  referencia.set({
    Email:email,
    Senha:senha
 })
   alert("Dados Gravados com Sucesso !");
   limpar();
   }a

   function limpar(){
    document.getElementById ('nome').value="";
    document.getElementById ('email').value="";
    document.getElementById ('senha').value="";
  } 