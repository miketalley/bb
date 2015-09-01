define(['jquery', 'forceChart'], function($, ForceChart){

	function ChartWidget(){
		var self = this;

		self.activate = function(settings){
			self.settings = settings;
			// subscribeToUpdates([
			// 	{
			// 		observable: self.settings.data,
			// 		callback: function(newData){
			// 			debugger;
			// 		}
			// 	}
			// ]);
		};

		self.attached = function(){
			self.forceChart = new ForceChart({
				// width: $parent.width(),
				// height: $parent.height(),
				selector: '.chart-widget',
				nodes: self.settings.nodes,
				links: self.settings.links
			});
		};

		// function createChart(settings){
		// 	var $parent = $(parent);

		// 	self.forceChart = new ForceChart(settings);
		// }

		function addNodes(nodes){

		}

		function addLinks(links){

		}

		// function subscribeToUpdates(subscriptions){
		// 	subscriptions.forEach(function(subscription){
		// 		subscription.observable.subscribe(function(newData){
		// 			subscription.callback(newData);
		// 		});
		// 	});
		// }

	}

	return ChartWidget;

});

