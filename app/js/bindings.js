define(['knockout', 'forceChart'], function(ko, ForceChart){

	(function(){

		ko.bindingHandlers.forceChart = {
			init: function(element, valueAccessor, allBindings, viewModel, bindingContext){
				var $ele = $(element),
					valAc = valueAccessor(),
					data = valAc.data(),
					nodes = data.nodes,
					links = data.links;

				viewModel.forceChart = new ForceChart({
					width: $ele.width(),
					height: $ele.height(),
					selector: element,
					nodeSource: nodes,
					linkSource: links
				});
			},
			update: function(element, valueAccessor, allBindings, viewModel, bindingContext){
				var $ele = $(element),
					valAc = valueAccessor(),
					data = valAc.data(),
					nodes = data.nodes,
					links = data.links;

				viewModel.forceChart.update(null, nodes, links);
			}
		};


	})();

});