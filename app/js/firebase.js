define(['firebase', 'firebase-simple-login'], function(Firebase, FirebaseSimpleLogin){

	function FirebaseAPI(){
		var self = this,
			firebase = new Firebase("https://beerbonder.firebaseio.com/"),
			firebaseAuthClient = new FirebaseSimpleLogin(firebase, function(error, user) {
			if (error) {
				// an error occurred while attempting login
				console.log(error);
			} else if (user) {
				// user authenticated with Firebase
				console.log("User ID: " + user.uid + ", Provider: " + user.provider);
			} else {
				// user is logged out
			}
		});


		self.checkLoginStatus = function(){

		};


		// Settings { email, password }
		self.newUser = function(settings){
			firebase.createUser(settings, handler);
		};

		// Settings { email, password }
		self.login = function(settings){
			firebase.authWithPassword(settings, handler);
		};

		// Settings { oldEmail, newEmail, password }
		self.changeEmail = function(settings){
			firebase.changeEmail(settings, handler);
		};

		// Settings { email, oldPassword, newPassword }
		self.changePassword = function(settings){
			firebase.changePassword(settings, handler);
		};

		// Settings { email }
		self.resetPassword = function(settings){
			firebase.resetPassword(settings, handler);
		};

		// Settings { email, password }
		self.deleteUser = function(settings){
			firebase.removeUser(settings, handler);
		};


		
		function handler(error, data){
			if(error){
				console.log("Error:", error);
			}
			else{
				console.log("Success:", data);
			}
		}

	}

	return FirebaseAPI;

});