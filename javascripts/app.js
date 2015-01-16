/* To do:
 *	 - complete heap sort
 * 	 - Add user input for array size (16, 32, 64).
 * 	 - Add user input for animation speed (slide bar?).
 */

// Populate dropdown list with sorting algorithms
for (var x in sorts) {
	var newOption = $('<option>');
	newOption.val(x);
	newOption.text(sorts[x].name);
	$('#sortOptions').append(newOption);
}

// Define global default values.
var rHeight = 300;
var rWidth = 640;
var elements = 64; // how many elements will be in the array (this will affect the line width).
var lineWidth = rWidth / elements;
var unsorted = []; // this is the array that will be sorted.
var animationTime = 10;

// Default colors for animations.
var unsortedColor = 'CornflowerBlue';
var sortedColor = 'BlueViolet';
var searchColor = 'red';

// Build SVG element and append to DOM.
d3.select('#display').append('svg')
	.attr('id', 'svgBoard')
  .attr('width', rWidth)
  .attr('height', rHeight)
	.append('g')
		.attr('id', 'rectContainer');

// Create rectangles for each element of the array and display in the SVG element.
var populate = function(data) {
  d3.select('g').selectAll('rect')
    .data(data)
		.enter().append('rect')
		.attr('id', function(d,i) { return 'r'+i; })
		.attr('class', 'rect')
		.attr('fill', unsortedColor)
    .attr('x', function(d,i) { return i*lineWidth; })
    .attr('y', function(d,i) { return rHeight-d.val; })
    .attr('height', function(d,i) { return d.val; })
    .attr('width', lineWidth);
};

var update = function(data) {
  var items = d3.selectAll('rect')
    .data(data)
		.transition()
			.ease('linear')
			.each(function() {
				d3.selectAll('rect').transition()
			    .attr('x', function(d,i) { return i*lineWidth; })
		    	.attr('y', function(d,i) { return rHeight-d.val; })
			    .attr('height', function(d,i) { return d.val; });
		  });
};

var parseStep = function(step) {
	var animate = {
		'update': function() {
			// Update all rectangles based on their data.
			if (!step.array) console.log('ERROR: parseStep.update called without target array.');
			var arr = step.array.slice();
			console.log(arr);
			var selector = [];
			var data = [];
			for (var i=0; i<arr.length; i++) {
				selector.push('#'+arr[i].id);
				data.push(arr[i].val);
			}
		},
	  'swap': function() {
	  	// Swap position of step.data1 and step.data2
	  	var d1 = d3.select('#r'+step.data1.pos);
	  	var d2 = d3.select('#r'+step.data2.pos);
	  	if (!d1 || !d2) return console.log("ERROR: parseStep.swap called with only one data point.");
	  	var temp = d1.attr('x');
	  	d1.attr('x', d2.attr('x'));
	  	d2.attr('x', temp);
	  },
	  'highlight': function() {
	  	d3.select('#r'+step.data.pos).style('fill', step.color);
	  	// Change color of rectangle to step.color || 'red'
	  },
	  'clearHighlight': function() {
	  	d3.select('#r'+step.data.pos).style('fill', unsortedColor);
	  	// Change color of svg element back to it's original color.
	  }
	};
  if (typeof animate[step.animation] !== 'function') throw 'ERROR: parseStep: invalid command.';
  return animate[step.animation]();
};

var animateSteps = function(steps) {  
  if (steps.length === 0) return;
  parseStep(steps[0]);
  setTimeout(function() {
    animateSteps(steps.slice(1));
  }, animationTime);
};

// Shuffles the array.
var randomize = function() {
	$('#itterations').text('0');
	d3.selectAll('rect').style('fill', unsortedColor);
	unsorted = [];
	for (var i=0; i<elements; i++) {
		// unsorted.push(Math.floor(Math.random()*rHeight));
		unsorted.push({ val: Math.floor(Math.random()*rHeight), pos: i });
	}
	update(unsorted);
	for (var x in sorts) {
		sorts[x].itterations = 0;
	}
};
randomize();

var startSort = function() {
	$('#itterations').text('0');
	sorts[$('#sortOptions').val()].display(unsorted, true);
};

populate(unsorted);
