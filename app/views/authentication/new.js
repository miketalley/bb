define(['knockout', 'authentication'], function(ko, authentication){

	function NewUser(){
		var self = this;

		self.username = ko.observable();
		self.email = ko.observable();
		self.password = ko.observable();
		self.confirmPassword = ko.observable().extend({ required: { message: "Confirm Password is required" },
			validation: {
				validator: function (val) {
					return val === self.password();
				},
				message: 'Must Match Password'
			}
		});
		self.untappdId = ko.observable();
		self.location = ko.observable();

		self.errors = ko.validation.group(self);

		self.createUser = function(){
			if(self.errors().length === 0){
				authentication.methods.createUser({
					username: self.username(),
					email: self.email(),
					password: self.password(),
					untappdId: self.untappdId(),
					location: self.location()
				});
			}
			else{
				self.errors.showAllMessages();
			}
		};
	}

	return NewUser;
});
