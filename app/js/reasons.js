define(['firebaseConfig'], function(firebaseConfig){

	function Reasons(){
		var self = this;

		self.reasons = firebaseConfig.reasons;
	}

	Reasons.prototype.update = function(bondId, reason){
		var newReason = {
				description: reason,
				strength: 1
			};

		this.reasons.child(bondId).transaction(function(storedReasons){
			if(storedReasons){
				var existingReason = storedReasons.filter(function(storedReason){
					return storedReason.description.toLowerCase() === reason.toLowerCase();
				})[0];
				if(existingReason){
					var i = storedReasons.indexOf(existingReason);

					storedReasons[i].strength += 1;
				}
				else{
					storedReasons.push(newReason);

				}
			}
			else{
				storedReasons = [newReason];
			}

			return storedReasons;
		});
	};

	return new Reasons();

});