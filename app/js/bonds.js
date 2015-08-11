define(['firebaseConfig'], function(firebaseConfig){

 	function Bonds(){
 		var self = this;

 		self.bonds = firebaseConfig.bonds;
 	}

 	Bonds.prototype.create = function(beer1, beer2, reason){
 		var bond = {
 			source_id: beer1.beer.bid,
 			target_id: beer2.beer.bid,
 			reason: reason
 		};

 		this.bonds.push(bond, function(){
 			// router.navigate()
 		});
 	};

 	return new Bonds();

});