define(['beers'], function(beers){

	function BeerSearchResults(){
		var self = this;

		self.searchTerm = ko.observable();
		self.resultTerm = ko.observable();
		self.results = ko.observable();

		self.searchAgain = function(){
			self.findBeer(self.searchTerm());
		};
	}

	BeerSearchResults.prototype.findBeer = function(beer){
		var self = this;

		beers.find(beer)
		.done(function(search){
			if(search){
				self.resultTerm(beer);
				self.results(search.response.beers.items);
			}
		});
	};

	BeerSearchResults.prototype.activate = function(settings, params){
		this.findBeer(params.searchTerm);
	};


	return BeerSearchResults;

});