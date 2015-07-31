define(['knockout', 'authentication'], function(ko, authentication){

	function NewUser(){
		var self = this;

		self.login = ko.observable();
		self.password = ko.observable();
		self.untappdUsernam = ko.observable();

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