define(['knockout', 'authentication'], function(ko, authentication){

	function NewUser(){
		var self = this;

		// var firebase = new Firebase("https://beerbonder.firebaseio.com/");
		// var firebaseAuth = new FirebaseSimpleLogin(firebase, function(error, user) {
		// 	if (error) {
		// 		// an error occurred while attempting login
		// 		console.log(error);
		// 	} else if (user) {
		// 		// user authenticated with Firebase
		// 		console.log("User ID: " + user.uid + ", Provider: " + user.provider);
		// 	} else {
		// 		// user is logged out
		// 	}
		// });

		self.login = ko.observable();
		self.password = ko.observable();

		self.doLogin = function(){
			loginUser(self.login(), self.password(), newUserSuccess);
		};

		function loginUser(login, password, callback){
			firebaseAuth.createUser.apply(this, arguments);
		}

		function newUserSuccess(){
			alert('Woot!');
		}

	}

	return NewUser;
});