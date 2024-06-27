// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAuth, createUserWithEmailandPassword, signInWithEmailandPassword} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAm_hpxJvmX1rMT-4Mruj5IFLlpkPGroIE",
    authDomain: "login-8b68d.firebaseapp.com",
    projectId: "login-8b68d",
    storageBucket: "login-8b68d.appspot.com",
    messagingSenderId: "847177819328",
    appId: "1:847177819328:web:d36bf8085afc762a66f925"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=> {
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailandPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email, 
            firstName: firstName,
            lastName: lastName, 
        };
        showMessage('Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        })
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage'); 
        }
    })
})