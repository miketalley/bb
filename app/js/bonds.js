define(['firebaseConfig', 'lodash', 'beers'], function(firebaseConfig, _, beers){

 	function Bonds(){
 		var self = this;

 		self.bonds = firebaseConfig.bonds;
 		self.beers = firebaseConfig.beers;

 		function incrementBondStrength(bondId){
 			bonds.child(bondId).transaction(function(currentValue){
 				return currentValue + 1;
 			});
 		}

 		function updateBondReasons(bondId, reason){
 			reasons.child(bondId).transaction(function(storedReasons){
 				var existingReason = storedReasons.filter(function(storedReason){
 					return storedReason.description.toLowerCase() === reason.toLowerCase();
 				})[0];
 				
 				if(existingReason){
 					var i = storedReasons.indexOf(existingReason);

 					storedReasons[i].strength += 1;
 				}
 				else{
 					storedReasons.push({
 						description: reason,
 						strength: 1
 					});

 				}

				return storedReasons;
			});
 		}
 	}

 	Bonds.prototype.create = function(beer1, beer2, reason){
 		var beer1Id = beer1.beer.bid,
 			beer2Id = beer2.beer.bid,
 			bondId = Math.min(beer1Id, beer2Id).toString() + '_' + Math.max(beer1Id, beer2Id),
 			bondRef = bonds.child('bondId'),
 			bondData = bondRef.once('value', function(data){
 				return data;
 			});
 			
 			beers.save(beer1, bondId);
 			beers.save(beer2, bondId);

 			if(bondData){
 				incrementBondStrength(bondId);
 			}

			else {
				// If existing beer, just add the new bond
				bondRef.child(bondId).set({
	 				source_id: beer1.beer.bid,
	 				target_id: beer2.beer.bid,
	 				strength: 1
 				});
			}
			updateBondReasons(bondId, reason);

 		// 	bond = {
 		// 		source_id: beer1.beer.bid,
 		// 		target_id: beer2.beer.bid
 		// 	}

			// 	bondFound = bondRef.once('value', function(data){
			// 		return data;
			// 	});

			// if(bondFound){
			// 	bondRef.update({
			// 		strength: bondFound.strength + 1 || 1
			// 	});
			// }

 		this.bonds.push(bond, function(){
 			// router.navigate()
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