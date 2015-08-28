define(['knockout', 'forceChart', 'lodash'], function(ko, ForceChart, _){

	(function(){

		// ko.bindingHandlers.forceChart = {
		// 	init: function(element, valueAccessor, allBindings, viewModel, bindingContext){
		// 		var $ele = $(element),
		// 			valAc = valueAccessor(),
		// 			// data = valAc.data,
		// 			nodes = data.nodes,
		// 			links = data.links,
		// 			beerId = data.beerId;

		// 		viewModel.forceChart = new ForceChart({
		// 			width: $ele.width(),
		// 			height: $ele.height(),
		// 			selector: element,
		// 			beerId: beerId,
		// 			// data: data
		// 		});
		// 	},
		// 	update: function(element, valueAccessor, allBindings, viewModel, bindingContext){
		// 		var $ele = $(element),
		// 			valAc = valueAccessor(),
		// 			// data = valAc.data(),
		// 			nodes = data.nodes,
		// 			links = data.links,
		// 			forceChart = viewModel.forceChart;

		// 		// _.debounce(viewModel.forceChart.updateSvg.bind(null, null, nodes, links), 50);
		// 		// viewModel.forceChart.updateSvg(null, nodes, links);
				
		// 		viewModel.forceChart.redraw();
		// 	}
		// };


	})();

});