define(['forceChart'], function(ForceChart){

	function ChartWidget(){
		var self = this;

		self.activate = function(settings){
			debugger;
			self.settings = settings;
		};

		self.attached = function(){

		};

		function createChart(data){
			self.forceChart = new ForceChart({
				width: self.settings.element.width(),
				height: self.settings.element.height(),
				selector: self.settings.element,
				data: data
			});
		}

		function addNode(){

		}

		function addLink(){

		}

	}

	return ChartWidget;

});

