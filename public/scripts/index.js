const reviewList = document.querySelector('.reviews');
const userLoggedOutLinks = document.querySelectorAll('.logged-out');
const userLoggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminElements = document.querySelectorAll('.admin');
const nonEmailVerify = document.querySelectorAll('.emailVerify');
const displayUI = (user =>{
  
  if(user){ //display logged in elements to logged in users
    if(user.admin){
      adminElements.forEach(item => item.style.display ='block');
    }
    
    //User details
  
    const html =`
    <div> Logged in as ${user.displayName}</div>
    <div class ="pink-text">${user.admin ? 'Admin' : ''}</div>
    <div class ="pink-text">${user.emailVerified ? 'Email verified' : 'Email not verified'}</div>
    `;
    accountDetails.innerHTML =html
    //display UI elements
    userLoggedInLinks.forEach(item =>item.style.display = 'block')
    userLoggedOutLinks.forEach(item =>item.style.display = 'none')
    if(user.emailVerified){
      nonEmailVerify.forEach(item =>item.style.display = 'none')
    }
    else{
      nonEmailVerify.forEach(item =>item.style.display = 'show')
    }
    
  }
  else{//display logged out elements to logged out users
    adminElements.forEach(item => item.style.display ='none');
    //Hide account details when user logs out
    accountDetails.innerHTML = '';
    //display UI elements
    userLoggedInLinks.forEach(item =>item.style.display = 'none')
    userLoggedOutLinks.forEach(item =>item.style.display = 'block') 
  }
})

//sets up reviews
const setupReviews = (data) => {
  if(data.length){
    let html = '';
    data.forEach(doc =>{
      const review = doc.data();
      const li = `
      <li>
      
        <div class = "collapsible-header grey lighten-4">${review.title}
        </div>
        <div class ="collapsible-body white">${review.content}</div>
      </li>
      `;
      html+= li
    });
    reviewList.innerHTML = html;
  }
  else{//If user is not logged in, display this message
    reviewList.innerHTML= '<h5 class="center-align"> Login to view reviews</h5>'
  } 
}

//Sets up the material components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

