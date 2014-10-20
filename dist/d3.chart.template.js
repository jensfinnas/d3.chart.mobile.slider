/*! d3.chart.template - v0.0.1
 *  License: MIT Expat
 *  Date: 2014-10-18
 */
d3.chart("BarChart", {
	initialize: function() {
		this.x = d3.scale.ordinal();
		this.y = d3.scale.linear();

		// Default values
		this._width = this._width || this.base.attr("width") || 500;
		this._height = this._height || this.base.attr("height") || 400;

		var barsLayerBase = this.base.append('g')
			.classed('bars', true);

		this.layer('bars', barsLayerBase, {
			dataBind: function(data) {
				var chart = this.chart();

				chart.x.domain(['a', 'b', 'c']);
				chart.y.domain([0, 10]);

				return this.selectAll('rect')
					.data(data);
			},
			insert: function() {
				var chart = this.chart();
				return this.append('rect');
			},
			events: {
				enter: function() {
					var chart = this.chart();
					return this
						.attr('height', function(d) { 
							return chart._height - chart.y(d.value); 
						})
						.attr('width', 20)
						.attr('x', function(d,i) {
							return i * 25;
						})
						.attr('y', function(d) {
							return chart.y(d.value);
						});
				}
			}
		});
	},

	width: function(newWidth) {
		if (arguments === 0) {
			return this._width;
		}
		this._width = newWidth;
		this.base.attr('width', this._width);

		this.xScale.range([0, this._width]);

		return this;
	},

	height: function(newHeight) {
		if (arguments === 0) {
			return this._height;
		}
		this._height = newHeight;
		this.base.attr('height', this._height);

		return this;
	} 
});
d3.chart("TemplateChart").extend("ExtendedTemplateChart", {

});