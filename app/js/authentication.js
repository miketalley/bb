define(['knockout', 'jquery', 'jquery-cookie', 'firebaseConfig'], function(ko, $, unused, firebaseConfig){

	function Authentication(settings){
		var self = this,
			firebase = firebaseConfig.firebase,
			firebaseAuthClient = firebaseConfig.firebaseAuth,
			users = firebaseConfig.users,
			user = firebaseConfig.user,
			authCookie, newUserSettings;

		self.currentUser = ko.observable();

		self.methods = {
			// Settings { email, password }
			createUser: function(settings){
				newUserSettings = settings;
				firebase.createUser(settings, createUserHandler);
			},
			// Settings { email, password }
			login: function(settings){
				firebase.authWithPassword(settings, handler);
			},
			tokenAuth: function(){
				var customToken = authCookie || getAuthCookie();

				if(customToken){
					firebase.authWithCustomToken(customToken, function(error, authData) {
					  if (error) {
					    console.log("Login Failed!", error);
					    return false;
					  } else {
					    console.log("Login Succeeded!", authData);
					    setCurrentUser(authData);
					    return authData;
					  }
					});
				}
			},
			logout: function(){
				self.currentUser(null);
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
			},
			getUser: function(userId){
				user(userId).on('value', function(userData){
					debugger;
				});
			}
		};

		function handler(error, data){
			if(error){
				console.log("Error:", error);
			}
			else{
				console.log("Success:", data);
				saveAuthCookie(data);
			}
		}

		function saveAuthCookie(authData){
			authCookie = authData.token;

			$.cookie("beerBonderAuthToken", authCookie, { expires : 30 });
		}

		function getAuthCookie(){
			return authCookie || $.cookie("beerBonderAuthToken");
		}

		function setCurrentUser(authData){
			var userId = authData.uid,
				currentUser = user(userId);

			currentUser.on('value', function(userData){
				self.currentUser(userData);
			});
		}

		function saveUser(authData, userData){
			delete userData.password;
			users.child(authData.uid).set(userData);
		}

		function createUserHandler(error, data){
			if(error){
				console.log("Error:", error);
			}
			else{
				console.log("Success:", data);
				saveAuthCookie(data);
				saveUser(data, newUserSettings);
				setCurrentUser(data);
			}
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
