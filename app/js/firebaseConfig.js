define(['firebase', 'firebase-simple-login'], function(){

	function FirebaseConfig(){
		var self = this;

		self.firebase = new Firebase("https://beerbonder.firebaseio.com/");
		self.users = self.firebase.child('users');
		self.beers = self.firebase.child('beers');
		self.bonds = self.firebase.child('bonds');

		self.user = function(userId){
			return self.users.child(userId);
		};

		// self.firebaseAuth = new FirebaseSimpleLogin(self.firebase, function(error, user) {
		// 	if (error) {
		// 		// an error occurred while attempting login
		// 		console.log(error);
		// 		return error;
		// 	} else if (user) {
		// 		// user authenticated with Firebase
		// 		console.log("User ID: " + user.uid + ", Provider: " + user.provider);
		// 		return user;
		// 	} else {
		// 		// user is logged out
		// 	}
		// });
	}

	return new FirebaseConfig();
});