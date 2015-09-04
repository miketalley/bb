define(['d3'], function(d3){

	function ForceChart(settings){
		var self = this,
			width = 960,
		    height = 500,
			linkClass = settings.linkClass || "link",
			nodeClass = settings.nodeClass || "node",
			textClass = settings.textClass || "text",
			color = d3.scale.category20(),
			linkDistance = settings.linkDistance || 50,
			charge = settings.charge || -2500,
			gravity = settings.gravity || 0.3,
			fixed = settings.fixed || true,
			_links = [],
			_nodes = [];

		self.settings = settings;

		self.settings.nodes.subscribe(function(newNodes){
			updateNodes(newNodes);
			redraw();
		});

		self.settings.links.subscribe(function(newLinks){
			var processedLinks = processRawLinksData(newLinks, nodes);

			updateLinks(processedLinks);
			// redraw();
		});

		// init svg
		var svg = d3.select(self.settings.selector)
		  .append("svg")
		    .attr("width", width)
		    .attr("height", height)
		    .attr("class", self.settings.className);
		
		// init force layout
		var force = d3.layout.force()
		    .size([width, height])
		    .linkDistance(linkDistance)
		    .charge(charge)
		    .gravity(gravity);

		var node = svg.selectAll(".node"),
		    link = svg.selectAll(".link");

		force.nodes(_nodes).links(_links).start();
		force.on("tick", tick);
		// d3.select(self.settings.selector).transition();

		function tick(){
		  	link.attr("x1", function(d){ 
		  		return d.source.x; 
		  	})
		    	.attr("y1", function(d){ return d.source.y; })
		      	.attr("x2", function(d){ return d.target.x; })
		      	.attr("y2", function(d){ return d.target.y; });

		  	
		  	node.attr("transform", function(d){ 
				return "translate(" + d.x + "," + d.y + ")"; 
			})
			.attr("weight", function(d){ 
				return d.weight; 
			});
		}

		function updateNodes(nodes){
			force.nodes(nodes);
			_nodes = nodes;
		}

		function updateLinks(links){
			force.links(links);
			_links = links;
		}

		// redraw force layout
		function redraw() {
			link.data(_links).enter().append("line")
		      .attr("class", linkClass);
			
			// link.exit().remove();
		  	
		  	node = node.data(_nodes).enter().insert('g')
				.attr("class", nodeClass);
				// .attr("width", 50)
				// .attr("height", 50)
				// .attr("x", height / 2)
				// .attr("y", width / 2)
		  
		  	node.append('image')
				.attr("xlink:href", function(d){ return d.beer.beer_label; })
				.attr("width", 50)
				.attr("height", 50);
				// .attr('ondblclick', function(d){ return "openLink(" + nodeLinkUrl + d.id + "')"; })
				// 
			node.append("text")
				.attr("fill", "black")
				// .attr("font-family", "sans-serif")
				// .attr("font-size", "10px")
				.attr('class', textClass)
				.text(function(d) { return d.beer.beer_name; });

			// node.exit().transition().remove();
			force.start();	  
		}

		function processRawLinksData(rawLinks){
			var newLinks = [];
			// Replace references of IDs
			rawLinks.forEach(function(link) {
				var sourceNode = _nodes.filter(function(node){ 
						return node.beer.bid === link.source_id; 
					})[0],
					targetNode = _nodes.filter(function(node){ 
						return node.beer.bid === link.target_id; 
					})[0];

				newLinks.push({source: sourceNode, target: targetNode, strength: link.strength});
				console.log('Pushing newLinks: ', sourceNode, targetNode);
			});

			return newLinks;
		}

		var drag = force.drag().on("dragstart", function(d){
			d3.select(this).classed("fixed", d.fixed = true);
		});

		window.fc = self;
		window.fc.redraw = redraw;
		window.fc.force = force;

	}

	return ForceChart;

});