define(['jquery', 'knockout', 'authentication'], function($, ko, authentication){

	function Login(){
		var self = this;

		self.email = ko.observable();
		self.password = ko.observable();

		self.login = function(){
			authentication.methods.login({
				email: self.email(),
				password: self.password(),
				rememberMe: true
			});
		};
	}

	return Login;
});
