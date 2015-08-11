define(['d3'], function(d3){

	function ForceChart(settings){
		var self = this,
			width = settings.width || window.innerWidth,
			height = settings.height || window.innerHeight,
			selector = settings.selector || "body",
			linkClass = settings.linkClass || ".link",
			nodeClass = settings.nodeClass || ".node",
			color = d3.scale.category20(),
			linkDistance = settings.linkDistance || 50,
			charge = settings.charge || -2500,
			gravity = settings.gravity || 0.3,
			fixed = settings.fixed || true,
			nodeSource = settings.nodeSource,
			linkSource = settings.linkSource,
			nodeLinkUrl = "";

	  	// Set Dynamic Force
	  	var force = d3.layout.force()
		.size([width, height])
		.linkDistance([linkDistance])
		.charge([charge])
		.gravity(gravity);

		var svg = d3.select(selector).append("svg")
		.attr("width", width)
		.attr("height", height);

		var link = svg.selectAll(linkClass),
		node = svg.selectAll(nodeClass);

		// Fix position of nodes once moved
		var drag = force.drag().on("dragstart", dragstart);

		function dragstart(d){
			if(fixed){
				d3.select(this).classed("fixed", d.fixed = true);
			}
		}

		// Getting data for nodes and links
		// queue()
		// .defer(d3.json, nodeJsonUrl)
		// .defer(d3.json, linkJsonUrl)
		// .await(update);


	  	self.update = function(error, nodes, links){
	  		debugger;
		  	console.log('Nodes: ' + nodes.length);
		  	console.log('Links: ' + links.length);
		  	var newLinks = [];

			// Replace references of IDs
			links.forEach(function(e) {
				var sourceNode = nodes.filter(function(n) { return n.id === e.source; })[0],
				targetNode = nodes.filter(function(n) { return n.id === e.target; })[0];

				newLinks.push({source: sourceNode, target: targetNode});
				console.log('Pushing newLinks: ', sourceNode, targetNode);
			});

			links = newLinks;

			var numberOfNodeLinks = function(node){
				return links.filter(function(p){
					return (p.source.id === node.id || p.target.id === node.id); });
			};

			for(var i = 0; i < nodes.length; i++){
				nodes[i].weight = numberOfNodeLinks(nodes[i]).length;
			}

			force.nodes(nodes).links(links).start();

			// Draw Name
			var texts = svg.selectAll("text")
			.data(nodes)
			.enter()
			.append("text")
			.attr("fill", "white")
			.attr("font-family", "sans-serif")
			.attr("font-size", "10px")
			.attr('class', 'text')
			.text(function(d) { return d.beer.beer_name; });

			// Draw Lines for Links
			var edges = svg.selectAll("line")
			.data(links)
			.enter()
			.append("line")
			.style("stroke", "#fff")
			.style("stroke-width", 2);

			// Draw Nodes
			node = svg.selectAll(".node")
			.data(nodes)
			.enter()
			.append('g')
			.attr('class', 'node')
			.call(drag);

			// Append Images to Nodes
			node.append('image')
			.attr("xlink:href", function(d){ return d.beer.beer_label; })
			// .attr('ondblclick', function(d){ return "openLink(" + nodeLinkUrl + d.id + "')"; })
			.attr("x", 0)
			.attr("y", 5)
			.attr("width", 50)
			.attr("height", 50);

			// Turn on Force
			force.on("tick", function() {
				edges
				.attr("x1", function(d) { return d.source.x + 20; })
				.attr("y1", function(d) { return d.source.y + 20; })
				.attr("x2", function(d) { return d.target.x + 20; })
				.attr("y2", function(d) { return d.target.y + 20; });
				node
				.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
				.attr("weight", function(d) { return d.weight; });
				texts.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			});
		};

		// if(nodeSource && nodeSource.length && linkSource && linkSource.length){
		// 	console.log('Binding ForceChart:', nodeSource, linkSource);
		// 	self.update(null, nodeSource, linkSource);
		// }

	}

	return ForceChart;

});