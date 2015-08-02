define(['knockout', 'authentication'], function(ko, authentication){

	function NewUser(){
		var self = this;

		self.email = ko.observable();
		self.password = ko.observable();
		self.untappdUsername = ko.observable();

		self.createUser = function(){
			authentication.methods.createUser({
				email: self.email(),
				password: self.password()
			});
		};

	}

	return NewUser;
});
