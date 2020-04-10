
//Admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});


auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult =>{
      user.admin= idTokenResult.claims.admin;
      displayUI(user);
    })
    db.collection('reviews').onSnapshot(snapshot => {
      setupReviews(snapshot.docs);
      console.log(user);
      
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
        
    }).then(() =>{//.then method fires a call back function when user is registered
      const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        send_verification();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML ='';//resets error shwon to user
    }).catch(err =>{
      signupForm.querySelector('.error').innerHTML =err.message // shows error to the user
    })
    
})

function send_verification(){
  var user = auth.currentUser;

  user.sendEmailVerification().then(function() {
    //email sent
    window.alert("verification sent!")
  }).catch(function(error){
      window.alert("Error :" +error.message)
  });
}

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
    console.log(cred);


    //closing the login modal and clear form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML ='';
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML =err.message
  })
})