define(['beers'], function(beers){

	function BeerSearchResults(){
		var self = this;

		self.searchTerm = ko.observable();
		self.resultTerm = ko.observable();
		self.results = ko.observableArray();
		self.noResultsFound = ko.observable();
		self.selectedBeer = ko.observable();
		self.linkBeer1 = ko.observable();
		self.linkBeer2 = ko.observable();
		self.isLoading = ko.observable();

		self.showLinkDetails = ko.pureComputed(function(){
			return !!(self.linkBeer1() && self.linkBeer2());
		});

		self.searchAgain = function(){
			self.findBeer(self.searchTerm());
		};

		self.linkBeer = function(beer){
			var linkBeer1 = self.linkBeer1(),
				linkBeer2 = self.linkBeer2();

			if((!linkBeer1 && !linkBeer2) || (linkBeer2 && !linkBeer1)){
				self.results.remove(beer);
				self.linkBeer1(beer);
			}
			else if(linkBeer1 && !linkBeer2){
				self.results.remove(beer);
				self.linkBeer2(beer);
			}
		};
	}

	BeerSearchResults.prototype.findBeer = function(beer){
		var self = this;

		self.noResultsFound(false);
		self.isLoading(true);
		self.resultTerm(beer);

		beers.find(beer)
		.done(function(search){	
			if(search && search.response.beers.count){
				self.results(search.response.beers.items);
			}
			else if(search && !search.response.beers.count){
				self.noResultsFound(true);
			}

			self.isLoading(false);
		});
	};

	BeerSearchResults.prototype.activate = function(settings, params){
		var beerId = params.bid,
			searchTerm = params.searchTerm;

		if(beerId){
			this.beerId(beerId);
		}
		else if(searchTerm){
			this.findBeer(searchTerm);
		}
	};


	return BeerSearchResults;

});