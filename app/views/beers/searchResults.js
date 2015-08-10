define(['beers'], function(beers){

	function BeerSearchResults(){
		var self = this;

		self.searchTerm = ko.observable();
		self.results = ko.observable();
	}

	BeerSearchResults.prototype.activate = function(settings, params){
		var self = this;

		this.searchTerm(params.searchTerm);
		
		beers.find(params.searchTerm)
		.done(function(search){
			if(search){
				self.results(search.response.beers.items);
			}
		});
	};

	return BeerSearchResults;

});