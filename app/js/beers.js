define(['jquery', 'knockout', 'firebaseConfig'], function($, ko, firebaseConfig){

	function Beers(){
		var self = this;

		self.beers = firebaseConfig.beers;
	}

	Beers.prototype.find = function(searchTerm, options){
	    var untappdBeerSearchUrl = "https://api.untappd.com/v4/search/beer",
			untappdId = "2C0534B0513D40B8703C0651A1626EA9A2C654BA",
			untappdSecret = "D20009CE3E6694F1CFFD12D890576F94401C695D";

	    // TODO -- add filters for search
	    return $.get(untappdBeerSearchUrl, {
	        client_id: untappdId, 
	        client_secret: untappdSecret,
	        q: searchTerm
	    });
	};

	Beers.prototype.save = function(beer){
		this.beers.child(beer.beer.bid).set(beer);
	};

	Beers.prototype.get = function(beerId){
		this.beers.child(beerId).once('value', function(data){
			return data;
		});
	};

	Beers.prototype.getAll = function(){
		this.beers.once('value', function(data){
			return data;
		});
	};

	Beers.prototype.getChildren = function(beerId){
		
	};

	return new Beers();

});