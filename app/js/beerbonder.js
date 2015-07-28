define(['firebase', 'plugins/dialog'], function(firebase, dialog){

	function BeerBonder(){
		var self = this;

		self.login = function(){
			dialog.show('../dialogs/login');
		};


	}

	return BeerBonder;

});