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
			var bondRef = beerData.bonds.child('bondId'),
				bondFound = bondRef.once('value', function(data){
					return data;
				});

			if(bondFound){
				bondRef.update({
					strength: bondFound.strength + 1 || 1;
				});
			}
			else {
				// If existing beer, just add the new bond
				beerRef.child('bonds').push(bondId);
			}
		}
		else{
			// If new beer, set up the bonds array
			beer.bonds = [bondId];
			this.beers.child(id).set(beer);
		}
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

	return new Beers();

});