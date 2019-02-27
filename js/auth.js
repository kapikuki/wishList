// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('INFO: user logged in');
    } else {
        console.log('INFO: user logged out');
    }
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  	e.preventDefault();
  	auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the login modal & reset form
        const modal = document.querySelector('#modal-login');
        $('#modal-login').modal('hide');
        loginForm.reset();
    });
});