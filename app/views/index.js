define(['plugins/router'], function(router){

	function Index(){
		var self = this,
			beerSearchUrl = '/beers/searchResults';

		self.searchTerm = ko.observable();

		self.findBeer = function(){
			var searchTerm = self.searchTerm();
			
			if(searchTerm){
				router.navigate(beerSearchUrl + '?searchTerm=' + searchTerm);
			}
		};

	}

	return Index;

});