define(['jquery', 'firebaseConfig'], function($, firebaseConfig){

	function Authentication(settings){
		var self = this,
			firebase = firebaseConfig.firebase,
			firebaseAuthClient = firebaseConfig.firebaseAuth;
		
		self.methods = {
			checkLoginStatus: function(){

			},
			// Settings { email, password }
			newUser: function(settings){
				firebase.createUser(settings, handler);
			},
			// Settings { email, password }
			login: function(settings){
				firebase.authWithPassword(settings, handler);
			},
			// Settings { oldEmail, newEmail, password }
			changeEmail: function(settings){
				firebase.changeEmail(settings, handler);
			},
			// Settings { email, oldPassword, newPassword }
			changePassword: function(settings){
				firebase.changePassword(settings, handler);
			},
			// Settings { email }
			resetPassword: function(settings){
				firebase.resetPassword(settings, handler);
			},
			// Settings { email, password }
			deleteUser: function(settings){
				firebase.removeUser(settings, handler);
			}
		};

		function handler(error, data){
			if(error){
				console.log("Error:", error);
			}
			else{
				console.log("Success:", data);
				saveAuthCookie(data);
				debugger;
			}
		}

		function saveAuthCookie(settings){
			debugger;
		}

		// function facebookLogin(){
		// 	firebase.authWithOAuthPopup("facebook", function(error, authData) {
		// 	  if (error) {
		// 	    console.log("Login Failed!", error);
		// 	  } else {
		// 	    console.log("Authenticated successfully with payload:", authData);
		// 	    debugger;
		// 	  }
		// 	});
		// }

		// function twitterLogin(){
		// 	firebase.authWithOAuthPopup("twitter", function(error, authData) {
		// 	  if (error) {
		// 	    console.log("Login Failed!", error);
		// 	  } else {
		// 	    console.log("Authenticated successfully with payload:", authData);
		// 	    debugger;
		// 	  }
		// 	});
		// }
				

		return self;
	}

	return new Authentication();

});