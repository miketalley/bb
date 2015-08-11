define(['firebaseConfig', 'lodash', 'beers', 'reasons'], function(firebaseConfig, _, beers, reasons){

 	function Bonds(){
 		var self = this;

 		self.bonds = firebaseConfig.bonds;
 		self.beers = firebaseConfig.beers;
 	}

 	Bonds.prototype.create = function(beer1, beer2, reason){
 		var beer1Id = beer1.beer.bid,
 			beer2Id = beer2.beer.bid,
 			bondId = Math.min(beer1Id, beer2Id).toString() + '_' + Math.max(beer1Id, beer2Id),
 			bondRef = this.bonds,
 			bondData = bondRef.once('value', function(data){
 				return data;
 			});
 			
 			beers.save(beer1, bondId);
 			beers.save(beer2, bondId);

 			if(bondData){
 				this.incrementBondStrength(bondId);
 			}
			else {
				bondRef.child(bondId).set({
	 				source_id: beer1.beer.bid,
	 				target_id: beer2.beer.bid,
	 				strength: 1
 				});
			}

			reasons.update(bondId, reason);
 	};

 	Bonds.prototype.incrementBondStrength = function(bondId){
		bonds.child(bondId).transaction(function(currentValue){
			return currentValue + 1;
		});
	};

 	Bonds.prototype.children = function(beer){
 		var children = {
 			beers: [],
 			bonds: []
 		};

 		this.priorBeer = this.priorBeer || beer;

 		// return _.uniq(bonds, function(bond){
 		// 	return bond.source_id === beer.beer.bid || bond.target_id === beer.beer.bid;
 		// });
 	};

 	return new Bonds();

});