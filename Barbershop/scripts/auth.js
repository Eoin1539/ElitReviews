//Create account
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // gets user's information from form
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

    //Register user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        const modal = document.querySelector('#modal-signup');
        MSAssertion.Modal.getInstance(modal.close());
        signupForm.reset();
    })
    //.then method fires a call back function when user is registered
})