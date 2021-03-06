define(['plugins/router', 'beerbonder', 'authentication'], function(router, beerbonder, authentication){

	function Shell(){
		var self = this;

		self.router = router;

		self.activate = function(){
			checkAuthenticationStatus();

			self.router.map([
				{ route: '', title:'Home', moduleId: 'views/index', nav: true, hash: '#home' },
				{ route: 'authentication/login', title:'Login', moduleId: 'views/authentication/login', nav: true },
				{ route: 'authentication/new', title:'New User', moduleId: 'views/authentication/new', nav: true },
				{ route: 'beers/searchResults*splat', title:'Beer Search Results', moduleId: 'views/beers/searchResults', nav: true }
			])
			.buildNavigationModel()
			.mapUnknownRoutes('views/index');

			return self.router.activate();
		};

		function checkAuthenticationStatus(){
			var user = authentication.methods.tokenAuth();
		}

		self.currentUser = authentication.currentUser;
		self.logout = authentication.methods.logout;

	}

	return Shell;

});
