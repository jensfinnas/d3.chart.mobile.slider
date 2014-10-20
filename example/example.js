var chart;
(function() {
  var data = [
  	{ 'name': 'a', value: 5 },
  	{ 'name': 'b', value: 2 },
  	{ 'name': 'c', value: 10 },
  	{ 'name': 'd', value: 4 },
  	{ 'name': 'e', value: 7 }
  ];
	chart = d3.select("div#vis")
	  .append("div")
	  .chart("MobileBarChart")
	  .width(500)
	  .height(400);
	 
	// render it with some data
	chart.draw(data);
}());