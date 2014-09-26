
		var data;    		// Global
		var max_x = 0; 		// Dynamically calculating size of width of SVG required
		var max_y = 0; 		// Dynamically calculating size of height of SVG required




		d3.json("resources/data.json",function(error, d) {			// Loading all the data from json.. 
					if (error) return console.warn(error);			// Ensure the loading..
					data = d;
					
					visualizeDataSet_1();      						// Visualize the data for 1st dataset..
					visualizeDataSet_2();      						// Visualize the data for 2nd dataset..
					visualizeDataSet_3();      						// Visualize the data for 3rd dataset..
					visualizeDataSet_4();      						// Visualize the data for 4th dataset..
					visualizeDataSet_5();      						// Visualize the data for 5th dataset..
					visualizeDataSet_6();      						// Visualize the data for 6th dataset..
					drawStarAndLine();
				
		});
		


	
		function visualizeDataSet_1() {
	
			var margin = {top: 30, right: 20, bottom: 30, left: 40},	
				width = 700 - margin.left - margin.right,					// SVG Width
				height = 300 - margin.top - margin.bottom;					// SVG Height
		
			var x = d3.scale.ordinal()									
				.rangeRoundBands([0, width], .1);						// X axis scale : ordinal

			var y = d3.scale.linear()									// Y axis scale : linear
				.range([height, 0]);

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left")
				.ticks(data[0].data1.length)
				.tickSize(-width);											// Dynamically creating ticks for y axis..
		
			var svg = d3.select(".section1").append("svg")									 // Painting SVG
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");        

				x.domain(data[0].data1.map(function(d) { return d.Year; }));							// Declaring domain range for x and y scale
				y.domain([0, d3.max(data[0].data1, function(d) { return Math.round( d.Dollar ); })]); 		// Dynamically getting domain 0 to math.round(max) 

				svg.append("g")									// Painting X Axis
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)
				.append("text")			
				.attr("x", 890)
				.attr("dx", ".71em")
				.style("text-anchor", "start")
				.text("Year");									

				svg.append("g")									// Painting Y Axis
				.attr("class", "y axis")
				.call(yAxis)
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end");
			
				
			var temp = svg.append("circle") 					// Creating Blob ::  Show Y axis measure on Hover											
							.attr("cx", 0)
							.attr("cy", height)
							.attr("r", 5)
							.style("fill", "purple");
			  
			function hover(d) {
					temp.transition().attr("cy",function(data) { return  y(d.Dollar); }); 			    // Blob transition on hover on element
				};
				
			function hoverOut(d) {
					temp.transition().attr("cy",height); 													// Blob transition on hoverOut on element
				};
				

		
			function render(){
				var a=svg.selectAll(".bar")						// Painting bar for chart
				.data(data[0].data1)
				.enter().append("rect")
				.on("mouseover", hover)
				.on("mouseout", hoverOut)
				.attr("id", "bar1")			
				.attr("class", "bar")
				 .attr("x", function(d) { return x(d.Year); })
				.attr("width", x.rangeBand())
				.attr("y", 500)
				.transition().duration(1000).ease("elastic").delay(function(d, i) { return i * 100; })				// Dynamic transition of each bar one after another..
				.attr("y", function(d,i) { return y(d.Dollar); })
				.attr("height", function(d) { return height - y(d.Dollar); });
				};
				
				render();										// Calling render function for the first time
				
				setInterval(function(){
				d3.selectAll("#bar1").remove(); 
				render();
				}, 4000);
	
	};	  // End of 1st visualization

	
	function visualizeDataSet_2(){

		var margin = {top: 30, right: 20, bottom: 30, left: 40},	
		width = 700 - margin.left - margin.right,					// SVG Width
		height = 300 - margin.top - margin.bottom;					// SVG Height
			
		var x = d3.scale.linear()							// X and Y axis scales 
			.range([0, width]);
			
			
		var y = d3.scale.ordinal()
			.rangeRoundBands([0, height], .1);
	
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");
			
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");
			
		var svg = d3.select(".section2").append("svg")								// Painting SVG
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			x.domain([0, 100]);														// declaring domain range for x and y scale
			y.domain(data[1].data2.map(function(d) { return d.Year; }));
		 		
		
		
			svg.append("g")									// Painting X Axis
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")			
			.attr("x", 890)
			.attr("dx", ".71em")
			.style("text-anchor", "start");		
			
			
			svg.append("g")									// Painting Y Axis
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end");
		
		function render() {			
			svg.selectAll(".bar")								// Paintin bar
			.data(data[1].data2)
			.enter().append("rect")
			.attr("id", "bar2")	
			.attr("class","bar")
			.attr("x", -width)
			.transition().duration(1000).delay(function(d, i) { return i * 100; })	
			.attr("x", 0)
			.attr("y", function(d) { return y(d.Year); })
			.attr("width", function(d) { return x(d.Percentage); })
			.attr("height", y.rangeBand());

			svg.selectAll(".remainingBar")						// Painting remaining bars
			.data(data[1].data2)
			.enter().append("rect")
			.attr("id", "bar2")	
			.attr("class","remainingBar")
			.attr("x", width)
			.transition().duration(1000).delay(function(d, i) { return i * 100; })	
			.attr("x", function(d) { return x(d.Percentage); })
			.attr("y", function(d) { return y(d.Year); })
			.attr("width", function(d) { return width - x(d.Percentage); })
			.attr("height", y.rangeBand());	


			svg.selectAll(".text")								// Appending text to bars
			.data(data[1].data2)
			.enter()
			.append("text")
			.attr("id", "bar2")	
			.attr("x", 10)
			.attr("y", function(d) { return y(d.Year) + (y.rangeBand()/2)+5; })
			.text( function(d) { return d.Percentage; })
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("fill", "white")
			.style("opacity", 0)
			.transition().duration(500).delay(1000).style("opacity", 1);
			
			svg.selectAll(".text")
			.data(data[1].data2)
			.enter()
			.append("text")
			.attr("id", "bar2")	
			.attr("x", width-30)
			.attr("y", function(d) { return y(d.Year) + (y.rangeBand()/2)+5; })
			.text( function(d) { return 100 - d.Percentage; })
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("fill", "white")
			.style("opacity", 0)
			.transition().duration(500).delay(1000).style("opacity", 1);
		};
			render();
			
		setInterval(function(){
			//.style("opacity", 1) .transition().duration(400).style("opacity", 0)
			d3.selectAll("#bar2").remove(); 
			render();
            }, 4000);
	};		// end of 2nd visualization
	 

	function visualizeDataSet_3(){
	 
		var margin = {top: 30, right: 20, bottom: 30, left: 40},	
			width = 900 - margin.left - margin.right,					// SVG Width
			height = 300 - margin.top - margin.bottom;					// SVG Height

		var svg = d3.select(".section3").append("svg")									 // Painting SVG
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		
		var pi = 2 * Math.PI;
		
		var arc = d3.svg.arc()							// Declaring arc
			.innerRadius(60)
			.outerRadius(75)
			.startAngle(pi/2);
	
		var g = svg.selectAll("g")
				.data(data[2].data3)
				.enter().append("g")
				.attr("transform", function(d, i) { return "translate(" + (i * 180+100) + ",150)"; })
				.attr("id", function(d, i) { return d.id;} )	;
				
			
				g.append("svg:text")                                     //add a label to each slice
                .attr("transform","translate( 10,72 )")             
				.attr("text-anchor", "middle")                          	
				.text(function(d, i) { return d.Percentage; });        
	
		var background = g.append("path")									// Drawing background gray arc
				.datum({endAngle: pi+(pi/2)})
				.style("fill", "rgba(0, 0, 0, 0.25)")
				.attr("d", arc);
	
				g.append("svg:image")
				.attr("xlink:href", function(d) { return d.image; })
				.attr("width", 70)
				.attr("height", 70)
				.attr("x", function(d,i) { return i-35; })
				.attr("y",function(d,i) { return i-35; });
	
		function render(){
			var temp;
			
			var foreground = d3.select('#a').append("path");			// Getting reference of each arc to animate 
			draw(0);
			var foreground = d3.select('#b').append("path");
			draw(1);
			var foreground = d3.select('#c').append("path");
			draw(2);
			var foreground = d3.select('#d').append("path");
			draw(3);
			var foreground = d3.select('#e').append("path");
			draw(4);
	
			function draw(temp){
				foreground.data(data[2].data3)							// Drawing arc with json data 
				.datum({endAngle: pi/2})
				.style("fill", "red")
				.attr("id","foreground")
				.attr("d", arc)
				.transition().ease("bounce")
				.duration(750)    
				.call(arcTween, ((pi * data[2].data3[temp].Percentage)/100)+(pi/2)) ;    // Calling arcTween function to animate
			}
				
    

			function arcTween(transition, newAngle) {
				transition.attrTween("d", function(d) {
				var interpolate = d3.interpolate(d.endAngle, newAngle);
				return function(t) {
					d.endAngle = interpolate(t);
				return arc(d);
				};
			  });
			  
			}
				
		}
		
		render();
	 
		setInterval(function(){
			d3.selectAll("#foreground").remove(); 
			render();
            }, 3000);
	};		// End of 3rd Visualization
	

	function visualizeDataSet_4(){

		var margin = {top: 30, right: 20, bottom: 30, left: 40},	
			width = 700 - margin.left - margin.right,					// SVG Width
			height = 300 - margin.top - margin.bottom;					// SVG Height

		var x = d3.scale.ordinal()											
			.rangeRoundBands([0, width], .1);

		var y = d3.scale.linear()
			.range([height, 0]);
	
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(5)
			.tickSize(-width);							// Dynamically creating ticks for y axis..
	
		var svg = d3.select(".section4").append("svg")									 // Painting SVG
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");          

			x.domain(data[3].data4.map(function(d) { return d.Year; }));
			y.domain([0, 200]);

			svg.append("g")									// Painting X Axis
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")			
			.attr("x", 890)
			.attr("dx", ".71em")
			.style("text-anchor", "start")
			.text("Year");									

			svg.append("g")									// Painting Y Axis
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em");
	
		function render(){
			svg.selectAll(".bar")						// Painting bar for chart
			.data(data[3].data4)
			.enter().append("rect")
			.attr("id", "bar3")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.Year); })
			.attr("width", x.rangeBand())
			.attr("y", -100)
			.transition().ease("bounce").duration(1000).delay(function(d, i) { return i * 100; })				// Dynamic transition of each bar one after another..
			.attr("y", function(d,i) { return y(d.Dollar); })
			.attr("height", function(d) { return height - y(d.Dollar); });
	   
	   };
			render();
			
		setInterval(function(){
			d3.selectAll("#bar3").remove(); 
			render();
            }, 4000);
	 };    //End of 4th Visualization
	 
	function visualizeDataSet_5(){
	
		var d1=data[4].data5;						// Declaring Data 1 & 2 for different pie 
		var d2=data[5].data6;
		var temp=d2;			
		var r=300;									// Declaring radius 
		
		
		var color=d3.scale.category20();	
		var color1=d3.scale.category10();

		var margin = {top: 30, right: 20, bottom: 30, left: 40},	
			width = 700 - margin.left - margin.right,					// SVG Width
			height = 300 - margin.top - margin.bottom;		
		
		var svg = d3.select(".section5").append("svg")									 // Painting SVG
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");    
				
		var group=svg.append("g")
			.attr("transform", "translate(300,100)");		
		
		var pie = d3.layout.pie()								// Declaring Pie
			.value(function(d) { return d.Percentage; })
			.sort(null);
	 
		var arc = d3.svg.arc()									// Declaring Arc
			.innerRadius(0)
			.outerRadius(100);
		
		var ColorOfPath = new Array();								// Declaring array to store color of particular path
		
		var path = group.datum(d1).selectAll("g")				// Declaring section in pie
		    .data(pie).enter().append("svg:path") 	   
			.attr("class", "slice")		
			.attr("fill", function(d, i) { return ColorOfPath[i]="hsl(" + Math.random() * 360 + ",60%,50%)"; })		// Generating random colors for painting the pie
			.attr("d", arc)
			.each(function(d) { this._current = d; }); 			// store the initial angles;   
		
	
	function render(temp){
	
		var arcs=group.selectAll(".arc")						//  Dummy pie to append text on top of original pie
			.data(pie(temp))
			.enter()
			.append("g")
			.attr("id","dummy_pie")
			.attr("class","arc")
			.append("svg:text")                                     //add a label to each slice 
			.attr("transform", function(d,i) {                    //set the label's origin to the center of the arc
				d.innerRadius = 0;
                d.outerRadius = 300;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")                          		//center the text on it's origin
            .text(function(d, i) { return temp[i].Percentage; });        //get the label from our original data array
		};
		
		render(d1);
		
		setInterval(function(){
				change(temp);					// Change Html content with pie updation
				if(temp==d2)
					{
						temp=d1;
						document.getElementById('showHide').style.display = "none";
						document.getElementById('hideShow').style.display = "inline";						
					}
					
				else
					{
						temp=d2;
						document.getElementById('showHide').style.display = "inline";		
						document.getElementById('hideShow').style.display = "none";
					}
				}, 3000);
	 
	  
	 
		function change(temp) {						// Pass new data for pie updatation
			//	if(temp==d2){ var colorSet=color; } else colorSet=color1; 
				group.datum(temp);
				var value = this.value;
				pie.value(function(d) { return d.Percentage; })
				path = path.data(pie); 				// compute the new angles
				path.attr("fill", function(d, i) { return ColorOfPath[i]="hsl(" + Math.random() * 360 + ",100%,65%)"; })			// Generating random colors for painting the pie
				path.attr("d", arc)
				path.transition().duration(750).attrTween("d", arcTween); // redraw the arc; 
				
				d3.selectAll("#dummy_pie").remove(); 
				render(temp);
				paintThePie();
	  }

		function arcTween(a) {								// Animate pie 
			  var i = d3.interpolate(this._current, a);
			  this._current = i(0);
			  return function(t) {
			  return arc(i(t));
		};
		};
		
		function paintThePie(){						// Get pie path color and color the boxes which are decleared in HTML
					
		d3.selectAll("#colorBOx").remove();
		for(var j=0; j<3; j++) {	
			svgContainer = d3.select("#pie_"+j+"");
			drawRectangle(ColorOfPath[j]);
		}
	
		function drawRectangle(color) {
			svgContainer.append("svg")
			.attr("width", 15)
			.attr("height", 15)
			.attr("id","colorBox")
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", 15)
			.attr("height", 15)
			.attr("fill",color); 
		};
		}
		paintThePie();
	};		// End of 5th visualization
		
	
	
	function visualizeDataSet_6(){
		var r=300;
		var color=d3.scale.category20();
		
		var margin = {top: 30, right: 20, bottom: 30, left: 40},	
			width = 500 - margin.left - margin.right,					// SVG Width
			height = 300 - margin.top - margin.bottom;		
	
		var svg = d3.select(".section6").append("svg")									 // Painting SVG
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");    
			
		var group=svg.append("g")
			.attr("transform", "translate(100,100)");    
			
		var arc=d3.svg.arc()						// Initiating arc
			.innerRadius(0)
			.outerRadius(100);
			
		var pie=d3.layout.pie()							// Declearing Pie
			.value(function (d){return d.Percentage;});
		
		var ColorOfPath = new Array();								// Declaring array to get color of perticular path		
		
		var arcs=group.selectAll(".arc")		
			.data(pie(data[6].data7))
			.enter()
			.append("g")
			.attr("class","arc");
			
			arcs.append("path")
			.attr("d",arc)
			.attr("fill",function(d,i){return ColorOfPath[i]=color(i)});
		
			arcs.append("svg:text")                                     //add a label to each slice 
				.attr("transform", function(d,i) {                    //set the label's origin to the center of the arc
                d.innerRadius = 0;
                d.outerRadius = 300;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")                          		//center the text on it's origin
            .text(function(d, i) { return data[6].data7[i].Percentage; });        //get the label from our original data array
        
		for(var j=0; j<4; j++) {	
			svgContainer = d3.select("#pie"+j+"");
			drawRectangle(ColorOfPath[j]);
		}
	
		function drawRectangle(color) {
			svgContainer.append("svg")
			.attr("width", 15)
			.attr("height", 15).append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", 15)
			.attr("height", 15)
			.attr("fill",color); 
		};
	};
	
	
																				//  draw line and star
	
	function drawStarAndLine(){	
		var canvas,canvas1, ctx, ctx1, length = 5; 
				canvas = document.getElementById("canvas");
				ctx = canvas.getContext("2d");
				ctx.fillStyle = '#000000';
				ctx.strokeStyle = 'red';
				ctx.fillRect(50,8,200,5);
				ctx.fillRect(300,8,200,5);
				ctx.translate(270, 10);
				ctx.rotate((Math.PI * 1 / 10));

			for (var i = 5; i--;) {
				
					ctx.lineTo(0, length);
					ctx.translate(0, length);
					ctx.rotate((Math.PI * 2 / 10));
					ctx.lineTo(0, -length);
					ctx.translate(0, -length);
					ctx.rotate(-(Math.PI * 6 / 10));
				}
				
				ctx.lineTo(0, length);
				ctx.closePath();
				ctx.stroke();
				drawStarAndLine1();
				};
				
				
		function drawStarAndLine1(){	
		var canvas1,  ctx1, length = 5; 
			
				canvas1 = document.getElementById("canvas1");	
				ctx1 = canvas1.getContext("2d");			
				ctx1.fillStyle="#000000";
				ctx1.strokeStyle = 'red';
				ctx1.fillRect(50,8,200,5);
				ctx1.fillRect(300,8,200,5);
				ctx1.translate(270, 10);
				ctx1.rotate((Math.PI * 1 / 10));

			for (var i = 5; i--;) {
				
			
					ctx1.lineTo(0, length);
					ctx1.translate(0, length);
					ctx1.rotate((Math.PI * 2 / 10));
					ctx1.lineTo(0, -length);
					ctx1.translate(0, -length);
					ctx1.rotate(-(Math.PI * 6 / 10));
				}
			
				ctx1.lineTo(0, length);
				ctx1.closePath();
				ctx1.stroke();
				};
				