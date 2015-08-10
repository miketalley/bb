define(['plugins/router'], function(router){

	function Index(){
		var self = this,
			beerSearchUrl = '/beers/searchResults';

		self.searchText = ko.observable();

		self.findBeer = function(){
			var searchText = self.searchText();
			
			if(searchText){
				router.navigate(beerSearchUrl + '?searchText=' + searchText);
			}
		};

	}

	return Index;

});