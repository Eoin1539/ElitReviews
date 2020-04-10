auth.onAuthStateChanged(user => {
  if (user) {
    db.collection('reviews').onSnapshot(snapshot => {
      setupReviews(snapshot.docs);
      console.log(user);
      displayUI(user);
    }, err => console.log(err.message));
  } else {
    displayUI();
    setupReviews([]);
  }
});



//Creating new reviews
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit' , (e) =>{
  e.preventDefault();
  
  db.collection('reviews').add({
    
    title: createForm['title'].value,
    content: createForm['content'].value,
    
    

  }).then(() =>{
    //close the modal and set the form fieleds to null

    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err =>{
    console.log(err.message);
  })
})



//Create account
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // gets user's information from form
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

    //Register user
    auth.createUserWithEmailAndPassword(email, password).then(function (result) {
      return result.user.updateProfile({
        displayName: signupForm['signup-username'].value,
        
        
      })
        
    }).then(() =>{
      const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        
    });
    //.then method fires a call back function when user is registered
})

//Logout method
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
})


//Login method
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  //Gets user creds from login form

  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {


    //closing the login modal and clear form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  })
})