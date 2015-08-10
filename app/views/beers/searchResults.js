define(['beers'], function(beers){

	function BeerSearchResults(){
		var self = this;

		self.searchTerm = ko.observable();
		self.resultTerm = ko.observable();
		self.results = ko.observable();
		self.selectedBeer = ko.observable();
		self.linkBeer1 = ko.observable();
		self.linkBeer2 = ko.observable();

		self.showLinkDetails = ko.pureComputed(function(){
			return !!(self.linkBeer1() && self.linkBeer2());
		});

		self.searchAgain = function(){
			self.findBeer(self.searchTerm());
		};

		self.linkBeer = function(beer){
			var linkBeer1 = self.linkBeer1(),
				linkBeer2 = self.linkBeer2();

			if(!linkBeer1 && !linkBeer2){
				self.linkBeer1(beer);
			}
			else if(linkBeer1 && !linkBeer2){
				self.linkBeer2(beer);
			}
			else if(linkBeer2 && !linkBeer1){
				self.linkBeer1(beer);
			}
			else if(linkBeer1 && linkBeer2){
				// Already got both!?
			}
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