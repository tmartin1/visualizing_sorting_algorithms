// Populate dropdown list with sorting algorithms
for (var x in sorts) {
	var newOption = $('<option>');
	newOption.text(x);
	$('#sortOptions').append(newOption);
}

// Build display area
var height = 300;
var width = 600;
var lineWidth = 3;
var unsorted = [];

d3.select('#display').append('svg')
  .attr('width', width)
  .attr('height', height)
	.append('g');

var populate = function(data) {
  d3.select('g').selectAll('rect')
    .data(data)
		.enter().append('rect')
		.attr('class', 'rect')
    .attr('x', function(d,i) { return i*lineWidth; })
    .attr('y', 0)
    .attr('height', function(d,i) { return d; })
    .attr('width', lineWidth);
};

var update = function(data) {
  var items = d3.selectAll('rect')
    .data(data)
		.transition()
			.ease('elastic')
			.style('color', 'red')
	    .attr('x', function(d,i) { return i*lineWidth; })
	    .attr('height', function(d,i) { return d; });
};

var randomize = function() {
	$('#itterations').text('0');
	unsorted = [];
	for (var i=0; i<width/lineWidth; i++) {
		unsorted.push(Math.floor(Math.random()*height));
	}
	update(unsorted);
};
randomize();

var startSort = function() {
	sorts[$('#sortOptions').val()](unsorted);
};
populate(unsorted);
