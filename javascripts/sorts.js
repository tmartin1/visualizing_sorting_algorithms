// Helper function to process sorts for the display.
var displaySolve = function(array, callback) {
	(function timedLoop(i) {
	  setTimeout(function() {
	  	//
	  }, 1)
	})(0)
};

// Helper function to process sorts for comparrisons.
var simpleSolve = function(array, callback) {
	//
};

// Object to hold all sort functions and properties.
var sorts = {};


// compare working
// display working
sorts.bubbleSort = {
	name: 'Bubble Sort',
	itterations: 0,
	display: function(array, noChange) {
		arr = array.slice();
		itterations = itterations || 0;
	  if (noChange) return;
	  var noChange = true;
		(function timedLoop(i) {
			setTimeout(function() {
		  	if (arr[i] > arr[i+1]) {
		  		var temp = arr[i];
		  		arr[i] = arr[i+1];
		  		arr[i+1] = temp;
		  		noChange = false;
		  		update(arr);
		  	}
		  	$('#itterations').text(++sorts['bubbleSort'].itterations);
		    if (i < arr.length) timedLoop(++i);
		    else sorts['bubbleSort'].display(arr, noChange);
			}, 1)
		})(0);
	},
	compare: function(array, noChange, itterations) {
		var arr = array.slice();
	  if (noChange) return this.itterations;
	  var noChange = true;
	  for (var i=0; i < arr.length; i++) {
	  	if (arr[i] > arr[i+1]) {
	  		var temp = arr[i];
	  		arr[i] = arr[i+1];
	  		arr[i+1] = temp;
	  		noChange = false;
	  	}
	  	this.itterations++;
	  }
	  return sorts['bubbleSort'].compare(arr, noChange);
	}
};

// compare working
// display working
sorts.insertionSort = {
	name: 'Insertion Sort',
	itterations: 0,
	display: function(array) {
		var arr = array.slice();
		(function timedLoop(i) {
			setTimeout(function() {
				if (arr[i] > arr[i+1]) {
		      var temp = arr[i];
		      arr[i] = arr[i+1];
		      arr[i+1] = temp;
		      i -= 2;
		    	update(arr);
		    }
		    $('#itterations').text(++sorts['insertionSort'].itterations);
		    if (i < arr.length) timedLoop(++i);
			}, 1)
		})(0);
	},
	compare: function(array) {
		var arr = array.slice();
	  for (var i=0; i < arr.length; i++) {
	    if (arr[i] > arr[i+1]) {
	      var temp = arr[i];
	      arr[i] = arr[i+1];
	      arr[i+1] = temp;
	      i -= 2;
	    }
	    this.itterations++;
	  }
		return this.itterations;
	}
};


// compare working
// display is working
sorts.selectionSort = {
	name: 'Selection Sort',
	itterations: 0,
	display: function(array) {
		var arr = array.slice();
		var result = [];

		var innerLoop = function(i, index) {
		  setTimeout(function() {
		  	if (arr[i] < arr[index]) index = i;
		  	$('#itterations').text(++sorts['selectionSort'].itterations);
		  	update(result.concat(arr));
		  	// colorize(this);
		  	if (i <= arr.length) innerLoop(++i, index);
		  	else outerLoop(index);
	  	}, 1)
	  };

	  var outerLoop = function(index) {
	  	result.push(arr.splice(index,1)[0]);
	  	update(result.concat(arr));
	  	if (arr.length > 0) innerLoop(0, 0);
	  };
		innerLoop(0, 0);
		update(result);
	},
	compare: function(array) {
		var arr = array.slice();
		var result = [];
		while (arr.length > 1) {
			var index = 0;
			for (var i=1; i<arr.length; i++) {
				if (arr[i] < arr[index]) index = i;
				this.itterations++;
			}
			this.itterations++;
			result.push(arr.splice(index,1)[0]);
		}
		result.push(arr[0]);
		return this.itterations;
	}
};


// compare not working
// display not working
sorts.heapSort = {
	name: 'Heap Sort',
	itterations: 0,
	display: function(array) {
		var arr = array.slice();
		//
		(function timedLoop(i) {
		  setTimeout(function() {
		  	//
		    $('#itterations').text(++sorts['heapSort'].itterations);
		  }, 1)
		})(0)
	},
	compare: function(array) {
		var arr = array.slice();
		var binaryArray = [];
		var result = [];

		// Build the binary sorted tree (array) from the initial array.


		// From the binary array, build the sorted array.


		return this.itterations;
	}
};


// compare not working
// display not working
sorts.shellSort = {
	name: 'Shell Sort',
	itterations: 0,
	display: function(array) {
		var arr = array.slice();
		var gaps = [];
		// Define steps, 2^k - 1
		var i = 1;
		while ( (Math.pow(2,i) - 1) < (arr.length / 2) ) {
			gaps.unshift(Math.pow(2,i) - 1);
			i++;
		}

		var innerLoop = function(i, gap) {
		  setTimeout(function() {
		  	// colorize the intervals of 'gap'
		  	if (arr[i] > arr[i+gap]) {
					var temp = arr[i];
		      arr[i] = arr[i+gap];
		      arr[i+gap] = temp;
		      i -= 2*gap;
				}
		  	$('#itterations').text(++sorts['selectionSort'].itterations);
		  	update(arr);
		  	if (i <= array.length*gap) innerLoop(i+gap, gap);
		  	else outerLoop();
	  	}, 1)
	  };

	  var outerLoop = function() {
	  	if (gaps.length > 0) innerLoop(0, gaps.shift());
	  };

		innerLoop(1, gaps.shift());
		update(arr);
	},
	compare: function(array) {
		var arr = array.slice();
		var gaps = [];
		// Define steps, 2^k - 1
		var i = 1;
		while ( (Math.pow(2,i) - 1) < (arr.length / 2) ) {
			gaps.unshift(Math.pow(2,i) - 1);
			i++;
		}
		// Compare and sort according to gaps.
		for (var i=0; i<gaps.length; i++) {
			// For each gap width, compare and sort accordingly.
			var gap = gaps[i];
			for (var j=gap; j<=array.length*gap; j+=gap) {
				// Compare at existing indicies of arr[gap[i]], arr[gap[i*2]], etc.
				if (arr[j] > arr[j+gap]) { // 15, 30, 45, 60
					var temp = arr[j];
		      arr[j] = arr[j+gap];
		      arr[j+gap] = temp;
		      j -= 2*gap;
				}
				this.itterations++;
			}
		}
		return this.itterations;
	}
};


// compare not working
// display not working
sorts.mergeSort = {
	name: 'Merge Sort',
	itterations: 0,
	display: function(array) {
		var arr = array.slice();
		//
		(function timedLoop(i) {
		  setTimeout(function() {
		  	//
		    $('#itterations').text(++sorts['mergeSort'].itterations);
		  }, 1)
		})(0)
	},
	compare: function(array) {
		var arr = array.slice();
		//
		return this.itterations;
	}
};


// compare works
// display not working
sorts.quickSort = {
	name: 'Quick Sort',
	itterations: 0,
	display: function(array, fractal) {
		var arr = array.slice();
		var fractal = fractal || arr.slice();
		if (arr.length === 0) return [];
		var left = [];
		var right = [];
		var pivot = arr[0];

		(function timedLoop(i) {
		  setTimeout(function() {
		  	// var temp = arr.shift();
		  	if(arr[i] > pivot) {
		  		left.push(arr[i]);
		  	} else {
		  		right.push(arr[i]);
		  	}
    		// console.log('left',left);
    		// console.log('right',right);
    		var temp = fractal.shift();
    		console.log(left.concat(right, fractal).length)

		  	// update(left.concat(right, fractal));
		  	
		  	$('#itterations').text(++sorts['quickSort'].itterations);
		    if (i < arr.length) {
		    	timedLoop(++i);
		    } else {
		    	// fractal.unshift(temp);
		    }
		  }, 1)
		    	sorts['quickSort'].display(left, fractal).concat(pivot, sorts['quickSort'].display(right, fractal));
		  update(arr);
		})(0)
	},
	compare: function(array) {
		if (array.length === 0) return [];
		var arr = array.slice();
		var left = [], right = [], pivot = arr[0];
    for (var i = 1; i < arr.length; i++) {
    	if(arr[i] < pivot) left.push(arr[i]);
    	else right.push(arr[i]);
    }
    return this.compare(left).concat(pivot, this.compare(right));
	}
};

