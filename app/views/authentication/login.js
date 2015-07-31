define(['jquery', 'knockout', 'authentication'], function($, ko, authentication){

	function Login(){
		var self = this;

		self.login = ko.observable();
		self.password = ko.observable();

		self.doLogin = function(){
			authentication.methods.login({
				email: self.login(), 
				password: self.password(),
				rememberMe: true
			});
		};
	}

	return Login;
});