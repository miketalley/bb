define(['knockout', 'plugins/router', 'beers', 'bonds'], function(ko, router, beers, bonds){

	function AllBeers(){
		var self = this,
			beerSearchUrl = '/beers/searchResults';

		self.beers = ko.observableArray();
		self.bonds = ko.observableArray();

		// self.data = ko.pureComputed(function(){
		// 	var beers = self.beers(),
		// 		bonds = self.bonds();

		// 	beers = convertToArray(beers);
		// 	bonds = convertToArray(bonds);

		// 	return {
		// 		nodes: beers,
		// 		links: bonds
		// 	};
		// });

		self.forceChartSettings = {
			nodes: self.beers,
			links: self.bonds
		};

		self.activate = function(){
			beers.getAll(function(data){
				var beersArray = convertToArray(data.val());
				
				self.beers(beersArray);
			});
			
			bonds.getAll(function(data){
				var bondsArray = convertToArray(data.val());
				
				self.bonds(bondsArray);
			});
		};

		self.searchTerm = ko.observable();

		self.findBeer = function(){
			var searchTerm = self.searchTerm();
			
			if(searchTerm){
				router.navigate(beerSearchUrl + '?searchTerm=' + searchTerm);
			}
		};

		function convertToArray(object){
			var keys = Object.keys(object),
				array = [];

			keys.forEach(function(key){
				array.push(object[key]);
			});

			return array;
		}

	}

	return AllBeers;

});