define(['jquery', 'knockout', 'firebaseConfig'], function($, ko, firebaseConfig){

	function Beers(){
		var self = this;

		self.beers = firebaseConfig.beers;
		self.bonds = firebaseConfig.bonds;
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

	Beers.prototype.save = function(beer, bondId){
		var id = beer.beer.bid,
			beerRef = this.beers.child(id),
			beerData = beerRef.once('value', function(data){
				return data;
			});

		if(beerData){
			beerRef.transaction(function(savedBeer){
				var bondFound = savedBeer.bonds.indexOf(bondId);

				if(!bondFound){
					savedBeer.bonds.push(bondId);
				}

				return savedBeer;
			});
		}
		else{
			// If new beer, set up the bonds array
			beer.bonds = [bondId];
			this.beers.child(id).set(beer);
		}
	};

	Beers.prototype.get = function(beerId, callback){
		this.beers.child(beerId).once('value', callback);
	};

	Beers.prototype.getAll = function(callback){
		this.beers.on('value', callback);
	};

	return new Beers();

});