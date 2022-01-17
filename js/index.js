import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';

export const firebaseApp = initializeApp(
    {
        apiKey: "AIzaSyD0ubLOWVsNj9M9BbTNDskYQCa015xbCoc",
        authDomain: "fuelpricesapp.firebaseapp.com",
        projectId: "fuelpricesapp",
        storageBucket: "fuelpricesapp.appspot.com",
        messagingSenderId: "423136422457",
        appId: "1:423136422457:web:28ea6620b617e16b1cbbe8"
    }
);

export const firebaseAuth = getAuth(firebaseApp);
var user_info = document.getElementById('user_name'); 
var login_but = document.getElementById('login_btn');
var logout_btn = document.getElementById('logout_btn');  

onAuthStateChanged(firebaseAuth, user => {
    window.localStorage.setItem('user', JSON.stringify(user))
    user_info.innerHTML = `Witaj ${user?.email}`
    if (user?.email)
    {
        user_info.style.display = "block";
        login_but.style.display = "none";
        logout_btn.style.display = "block"
        find_fun();
        geoFindMe();
    }
});


