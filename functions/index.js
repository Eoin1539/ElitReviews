const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) =>{
    //Check if user is an admin
    if(context.auth.token.admin !== true){
        return{ errpr: 'only admins can make another admin'}
    }

    //Get the user that needs to be an admin and add a customer claim to that user
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then (() =>{
        return {
            message: `Success! ${data.email} now has admin privileges`
        }
    }).catch(err => {
        return err;
    })

})
