import { firebaseAuth } from "./index.js"; 
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';

const loginForm = document.querySelector('#login-form');
const googleBtn = document.querySelector('#login_via_google');
const logout_btn = document.getElementById('logout_btn');
const reg_btn = document.getElementById('registration_btn')
var user_info = document.getElementById('user_name'); 
var login_but = document.getElementById('login_btn'); 
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['email']?.value;
    const password = loginForm['password']?.value;
    signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(res => console.log(res))
        .catch(err => alert('Nieprawodłowy login/hasło'));
});


googleBtn.addEventListener('click', (e) =>
{
    e.preventDefault();
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})

logout_btn.addEventListener('click', (e) => {
  e.preventDefault();
  signOut(firebaseAuth).then(() => {
      login_but.style.display = "block";
      logout_btn.style.display = "none";
      user_info.style.display = "none";
      window.localStorage.setItem('user', '')
      login_fun();
    }).catch((error) => {
      // An error happened.
    });
})

reg_btn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = loginForm['email']?.value;
  const password = loginForm['password']?.value;
  createUserWithEmailAndPassword(firebaseAuth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ..
  });
})