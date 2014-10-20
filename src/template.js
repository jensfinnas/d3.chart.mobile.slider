d3.chart("BarChart", {
	initialize: function() {
		// Init scales
		this.x = d3.scale.ordinal();
		this.y = d3.scale.linear();

		// Append svg canvas
		this.svg = this.base.append('svg');
		
		// Set default values
		this._margin = m = this._margin || { 
			'left': 30,
			'right': 10,
			'top': 30,
			'bottom': 30 
		}
		this._width = this._width || this.svg.attr("width") || 500;
		this._height = this._height || this.svg.attr("height") || 400;



		var chartLayerBase = this.svg.append('g')
			.attr('class', 'canvas')
			.attr('transform', 'translate(' + m.left + ', '+ m.top +')');

		this.layer('chart', chartLayerBase, {
			dataBind: function(data) {
				var chart = this.chart();

				chart.x.domain(data.map(function(d) { return d.name; }));
				chart.y.domain([0, d3.max(data, function(d) { return d.value; })]);

				return this.selectAll('rect')
					.data(data);
			},
			insert: function() {
				var chart = this.chart();
				return this.append('rect')
				.attr('class', 'data-item');
			},
			events: {
				enter: function() {
					var chart = this.chart();
					return this
						.attr('height', function(d) { 
							return chart._height - chart.y(d.value); 
						})
						.attr('width', chart.x.rangeBand())
						.attr('transform', function(d,i) {
							return 'translate('+ chart.x(d.name) +','+ chart.y(d.value) +')';
						})
				}
			}
		});
	},

	width: function(newWidth) {
		if (arguments === 0) {
			return this._width;
		}
		var m = this._margin;
		this._svgWidth = newWidth;
		this._width = newWidth - m.left - m.right;
		this.svg.attr('width', this._svgWidth);

		this.x.rangeBands([0, this._width], .1, .1);

		return this;
	},

	height: function(newHeight) {
		if (arguments === 0) {
			return this._height;
		}
		var m = this._margin;
		this._svgHeight = newHeight;
		this._height = newHeight - m.top - m.bottom;
		this.svg.attr('height', this._svgHeight);

		this.y.range([this._height, 0])

		return this;
	},

	margin: function(newMargin) {
		if (arguments === 0) {
			return this._margin;
		}
		this._margin = newMargin;
		return this;
	}
});