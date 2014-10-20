d3.chart("BarChart").extend("MobileBarChart", {
	initialize: function() {
		var self = this;

		// Add slider
		this.base.append('div')
		.attr('class','slider')
		.attr('id', 'chart-slider');

		// Init slider
		this.slider = $('#chart-slider').noUiSlider({
			start: [ .5 ],
			range: {
				'min': [ 0 ],
				'max': [ 1 ]
			}
		})
		// Problem: This part (the width of the slider) 
		// should be set after <instance>.width() has run,
		// and not in initialization
		.css({
			'width': this._width,
			'margin-left': this._margin.left 	
		})
		// Check which data element is closest and highlight
		.on('slide', function() {
			var value = $(this).val();
			self.svg.selectAll('.data-item')
			.classed('highlight', function(d) {
				return d._x0 < value && value <= d._x1; 
			})

		});

		this.layer('chart').on('enter', function() {
			var chart = this.chart();
			var dataItems = this[0];

			// We want to highlight the element that is closest to the
			// position of the slider. To do this we give each data element
			// a relative x range between 0 and 1.

			// Get x position of canvas
			var bcr = chart.svg.node().getBoundingClientRect();
			var canvasX = bcr.left + chart._margin.left;

			dataItems.map(function(el) {
				// Get the relative x position of the center of the data element 
				// on the canvas
				var bcr = el.getBoundingClientRect();
				var x0 = bcr.left;
				var x1 = x0 + bcr.width;
				el.__data__._x = ((x0 + x1) / 2 - canvasX) / chart._width;
				return el;
			})
			// Sort data elements by x positions
			.sort(function(a,b) {
				return d3.ascending(a.__data__._x, b.__data__._x);
			})
			// Calculate the x range where the element should be highlighted
			.map(function(el,i) {
				var d = el.__data__;
				var prevX, nextX;
				// Get the position of the previous and next data element
				if (typeof dataItems[i - 1] == 'undefined') {
					prevX = 0;
				}
				else {
					prevX = dataItems[i - 1].__data__._x;
				}
				if (typeof dataItems[i + 1] == 'undefined') {
					nextX = 1;
				}
				else {
					nextX = dataItems[i + 1].__data__._x;
				}
				d._x0 = prevX == 0 ? 0 : (prevX + d._x) / 2;
				d._x1 = prevX == 1 ? 1 : (nextX + d._x) / 2;
				return el;
			})
		})
	}
});