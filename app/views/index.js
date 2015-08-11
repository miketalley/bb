define(['knockout', 'plugins/router', 'beers', 'bonds'], function(ko, router, beers, bonds){

	function Index(){
		var self = this,
			beerSearchUrl = '/beers/searchResults';

		self.beers = ko.observableArray();
		self.bonds = ko.observableArray();

		self.data = ko.pureComputed(function(){
			var beers = self.beers(),
				bonds = self.bonds();

			return {
				nodes: beers,
				links: bonds
			};
		});

		self.forceChartSettings = {
			data: self.data
		};

		beers.getAll(function(data){
			self.beers(data.val());
		});

		bonds.getAll(function(data){
			self.bonds(data.val());
		});

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