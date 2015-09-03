define(['d3'], function(d3){

	function ForceChart(settings){
		var self = this,
			linkClass = settings.linkClass || "link",
			nodeClass = settings.nodeClass || "node",
			textClass = settings.textClass || "text",
			color = d3.scale.category20(),
			linkDistance = settings.linkDistance || 50,
			charge = settings.charge || -2500,
			gravity = settings.gravity || 0.3,
			fixed = settings.fixed || true;

		self.settings = settings;

			// width = settings.width || window.innerWidth,
			// height = settings.height || window.innerHeight,
			// className = settings.className || "force-chart",
			// selector = settings.selector || "body",
			// nodeSource = settings.nodes,
			// linkSource = settings.links,
			// data = settings.data,
			// nodeLinkUrl = "",
			// svg, link, text, node;
		
		/* PUBLIC FUNCTIONS */ 

		self.updateSvg = function(error, nodes, links){
			if(nodes && nodes.length && links && links.length){
				console.log('Binding ForceChart:', nodes, links);
				update(null, nodes, links);
			}

			d3.select(selector).transition();
		};

		self.redraw = function(){
			redraw();
		};


		/* ACTIVATION */

		generateSvg();
		
	  	

	  	/* PRIVATE FUNCTIONS */

		function generateSvg(){
			svg = d3.select(selector).append("svg")
			.attr("class", className)
			.attr("width", width)
			.attr("height", height);

			// svg.exit().remove();
		}

		// data.subscribe(function(newData){
		// 	self.updateSvg(null, newData.nodes, newData.links);
		// });

		// var link = svg.selectAll(linkClass),
		// node = svg.selectAll(nodeClass);

	  	function update(error, nodes, links){
		  	console.log('Nodes: ' + nodes.length);
		  	console.log('Links: ' + links.length);
		  	var newLinks = [];

			// Replace references of IDs
			links.forEach(function(link) {
				var sourceNode = nodes.filter(function(node){ 
						return node.beer.bid === link.source_id; 
					})[0],
					targetNode = nodes.filter(function(node){ 
						return node.beer.bid === link.target_id; 
					})[0];

				newLinks.push({source: sourceNode, target: targetNode, strength: link.strength});
				console.log('Pushing newLinks: ', sourceNode, targetNode);
			});

			links = newLinks;

			var numberOfNodeLinks = function(node){
				return links.filter(function(p){
					return (p.source.id === node.id || p.target.id === node.id); 
				});
			};

			for(var i = 0; i < nodes.length; i++){
				nodes[i].weight = numberOfNodeLinks(nodes[i]).length;
			}

			force.nodes(nodes).links(links).start();

			// Draw Name
			text = svg.selectAll("text")
			.data(nodes)
			.enter()
			.append("text")
			// .attr("fill", "black")
			// .attr("font-family", "sans-serif")
			// .attr("font-size", "10px")
			.attr('class', textClass)
			.text(function(d) { return d.beer.beer_name; });

			// Draw Lines for Links
			link = svg.selectAll("line")
			.data(links)
			.enter()
			.append("line")
			.attr('class', linkClass)
			.style("stroke-width", function(link){ return link.strength });
			// .style("stroke", "#000")
			// .style("stroke-width", 4);

			// Draw Nodes
			node = svg.selectAll("node")
			.data(nodes)
			.enter()
			.append('g')
			.attr('class', nodeClass)
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
			force.on("tick", tick);
		}

		function redraw() {

			  link = link.data(links);

			  link.enter().insert("line", ".node")
			      .attr("class", "link")
			      .on("mousedown", 
			        function(d) { 
			          mousedown_link = d; 
			          if (mousedown_link == selected_link) selected_link = null;
			          else selected_link = mousedown_link; 
			          selected_node = null; 
			          redraw(); 
			        });

			  link.exit().remove();

			  link
			    .classed("link_selected", function(d) { return d === selected_link; });

			  node = node.data(nodes);

			  node.enter().insert("circle")
			      .attr("class", "node")
			      .attr("r", 5)
			      .on("mousedown", 
			        function(d) { 
			          // disable zoom
			          vis.call(d3.behavior.zoom().on("zoom"), null);

			          mousedown_node = d;
			          if (mousedown_node == selected_node) selected_node = null;
			          else selected_node = mousedown_node; 
			          selected_link = null; 

			          // reposition drag line
			          drag_line
			              .attr("class", "link")
			              .attr("x1", mousedown_node.x)
			              .attr("y1", mousedown_node.y)
			              .attr("x2", mousedown_node.x)
			              .attr("y2", mousedown_node.y);

			          redraw(); 
			        })
			      .on("mousedrag",
			        function(d) {
			          // redraw();
			        })
			      .on("mouseup", 
			        function(d) { 
			          if (mousedown_node) {
			            mouseup_node = d; 
			            if (mouseup_node == mousedown_node) { resetMouseVars(); return; }

			            // add link
			            var link = {source: mousedown_node, target: mouseup_node};
			            links.push(link);

			            // select new link
			            selected_link = link;
			            selected_node = null;

			            // enable zoom
			            vis.call(d3.behavior.zoom().on("zoom"), rescale);
			            redraw();
			          } 
			        })
			    .transition()
			      .duration(750)
			      .ease("elastic")
			      .attr("r", 6.5);

			  node.exit().transition()
			      .attr("r", 0)
			    .remove();

			  node
			    .classed("node_selected", function(d) { return d === selected_node; });

			  

			  if (d3.event) {
			    // prevent browser's default behavior
			    d3.event.preventDefault();
			  }

			  force.start();

			}

		function tick(){
			// Links
			link
			.attr("x1", function(d){ 
				return d.source.x + 20; 
			})
			.attr("y1", function(d){ 
				return d.source.y + 20; 
			})
			.attr("x2", function(d){ 
				return d.target.x + 20; 
			})
			.attr("y2", function(d){ 
				return d.target.y + 20; 
			});
			
			// Nodes
			node
			.attr("transform", function(d){ 
				return "translate(" + d.x + "," + d.y + ")"; 
			})
			.attr("weight", function(d){ 
				return d.weight; 
			});
			
			// Text
			text.attr("transform", function(d){ return "translate(" + d.x + "," + d.y + ")"; });
		}

		function subscribeToNodes(){

		}

		// Set Dynamic Force
		function setForce(settings){
	  		return d3.layout.force()
				.size([width, height])
				.linkDistance([linkDistance])
				.charge([charge])
				.gravity(gravity);
		}

		// Fix position of nodes once moved
		var drag = force.drag().on("dragstart", dragstart);

		function dragstart(d){
			if(fixed){
				d3.select(this).classed("fixed", d.fixed = true);
			}
		}

	}

	return ForceChart;

});