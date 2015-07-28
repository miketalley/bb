define(['knockout', 'firebaseAPI'], function(ko, FirebaseAPI){

	function Login(){
		var self = this;

		self.loginOptions = ['password', 'facebook', 'twitter', 'gmail'];

		var firebase = new Firebase("https://beerbonder.firebaseio.com/");
		var firebaseAuth = new FirebaseSimpleLogin(firebase, function(error, user) {
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

		self.login = ko.observable();
		self.password = ko.observable();
		self.type = ko.observable();

		self.doLogin = function(){
			loginUser(self.login(), self.password(), self.type());
		};

		function loginUser(login, password, type){
			firebaseAuth.login(type, {
				email: "test@testuser.com", 
				password: "password",
				rememberMe: true
			});
		}


	}

	return Login;
});