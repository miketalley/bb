define([], function(){

	function BeerSearchResults(){
		var self = this;
	}

	BeerSearchResults.prototype.activate = function(settings, params){
		self.searchText = params.searchText;
	};

	return BeerSearchResults;

});