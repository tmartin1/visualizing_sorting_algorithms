/* To do:
 *	 - complete merge sort
 *	 - complete selection sort
 *	 - complete shell sort
 *	 - complete heap sort
 *	 - refator sort methods such that display functions and compare
 *		 functions are processed by the same external function that takes
 *		 the array and a callback as parameters.
 * 	 - Add table to index.html to show the comparrison of itterations
 * 		 for each of the different sorting algorithms.
 */

// Populate dropdown list with sorting algorithms
for (var x in sorts) {
	var newOption = $('<option>');
	newOption.val(x);
	newOption.text(sorts[x].name);
	$('#sortOptions').append(newOption);
}

// Build display area
var rHeight = 300;
var rWidth = 600;
var lineWidth = 10;
var unsorted = [];

d3.select('#display').append('svg')
  .attr('width', rWidth)
  .attr('height', rHeight)
	.append('g');

var populate = function(data) {
  d3.select('g').selectAll('rect')
    .data(data)
		.enter().append('rect')
		.attr('class', 'rect')
    .attr('x', function(d,i) { return i*lineWidth; })
    .attr('y', function(d,i) { return rHeight-d; })
    .attr('height', function(d,i) { return d; })
    .attr('width', lineWidth);
};

var update = function(data) {
  var items = d3.selectAll('rect')
    .data(data)
		.transition()
			.ease('linear')
			.each(function() {
				d3.selectAll('rect').transition()
			    .attr('x', function(d,i) {
			    	// if ($(this).attr('x') !== i*lineWidth) d3.select(this).style('fill', 'red');
			    	return i*lineWidth; 
			    })
		    	.attr('y', function(d,i) { return rHeight-d; })
			    .attr('height', function(d,i) {
			    	// if ($(this).attr('height') !== d) d3.select(this).style('fill', 'blue');
			    	return d;
			    });
		  });
};

var enterTransition

var randomize = function() {
	$('#itterations').text('0');
	unsorted = [];
	for (var i=0; i<rWidth/lineWidth; i++) {
		unsorted.push(Math.floor(Math.random()*rHeight));
	}
	update(unsorted);
	for (var x in sorts) {
		sorts[x].itterations = 0;
	}
};
randomize();

var startSort = function() {
	sorts[$('#sortOptions').val()].display(unsorted);
};

populate(unsorted);
