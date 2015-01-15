// Helper function to process swapping of two elements in an array.
var swap = function(arr, a, b, steps) {
	steps = steps || [];
	if (a === b) return;
	var temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
	// if (steps) steps.push({ animation: 'swap', data1: arr.slice(a, 1), data2: arr.slice(b, 1) });
};

// Object to hold all sort functions and properties.
var sorts = {};

// compare working
// display working
sorts.bubbleSort = {
	name: 'Bubble Sort',
	itterations: 0,
	display: function(array, animate, steps) {
		steps = steps || [];
		var arr = array.slice();
	  var changed = false;
	  for (var i=0; i < arr.length; i++) {
	  	var focus = arr.slice()[i];
	  	steps.push({ animation: 'highlight', color: 'red', data: focus });
	  	if (arr[i+1] && arr[i].val > arr[i+1].val) {
	      steps.push({ animation: 'swap', data1: arr[i], data2: arr[i+1] });
	  		swap(arr, i, i+1);
	  		changed = true;
	  	} else {
	  		steps.push({ animation: 'clearHighlight', data: focus });
	  	}
	  	this.itterations++;
	  }
	  return changed === true ? this.display(arr, true, steps) : (animate) ? animateSteps(steps) : this.itterations;
	}
};

// compare working
// display working
sorts.insertionSort = {
	name: 'Insertion Sort',
	itterations: 0,
	display: function(array, animate) {
		var steps = [];
		var arr = array.slice();
	  for (var i=0; i < arr.length; i++) {
	  	var focus = arr.slice()[i];
	  	steps.push({ animation: 'highlight', color: 'red', data: focus });
	    if (arr[i] && arr[i+1] && arr[i].val > arr[i+1].val) {
	      steps.push({ animation: 'swap', data1: arr[i], data2: arr[i+1] });
	      swap(arr, i, i+1, steps);
	      i = i-2 >= -1 ? i-2 : i-1;
	    }
	  	steps.push({ animation: 'clearHighlight', data: focus });
	    this.itterations++;
	  }
	  console.log(steps);
		if (animate) animateSteps(steps);
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
		  	if (arr[i].val < arr[index].val) index = i;
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
				if (arr[i].val < arr[index].val) index = i;
				this.itterations++;
			}
			this.itterations++;
			result.push(arr.splice(index, 1)[0]);
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


// compare is working
// display is working
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
		  	if (arr[i] && arr[i+gap] && arr[i].val > arr[i+gap].val) {
					swap(arr, i, i+gap);
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
				if (arr[i] && arr[i+gap] && arr[j].val > arr[j+gap].val) {
					swap(arr, j, j+gap);
		      j -= 2*gap;
				}
				this.itterations++;
			}
		}
		return this.itterations;
	}
};


// compare is working
// display not working
sorts.mergeSort = {
	name: 'Merge Sort',
	itterations: 0,
	display: function(array) {
		var arr = array.slice();

		var compare = function(a, b) {
			return a - b;
		};

		// sorts 0-2, then 2-4, then 0-4, then 4-6, then 6-8, then 4-8, then 0-8, then 8-10, 10-12, 8-12, 12-14, 14-16, 8-16, 0-16, etc.
		for (var i=0; i<64; i++) {
			//
		}

		var timedMerge = function(left, right, result, iLeft, iRight) {
		  setTimeout(function() {
		  	result = result || [];
		  	iLeft = iLeft || 0;
		  	iRight = iRight || 0;

		    $('#itterations').text(++sorts['mergeSort'].itterations);
		    if (left[iLeft].val < right[iRight].val) {
		    	result.push(left[iLeft++]);
		    } else {
		    	result.push(right[iRight++]);
		    }

		    if (iLeft < left.length && iRight < right.length) {
		    	console.log('left', left);
		    	console.log('right', right);
		    	console.log('result', result);
		    	timedLoop(left, right, result, iLeft, iRight);
		    } else {
		    	return result.concat(left.slice(iLeft)).concat(right.slice(iRight));
		    }
		  }, 1);
		};

		var mergeSort = function(array) {
			sorts['mergeSort'].itterations++;
			var arr = array.slice();
			if (arr.length < 2) return array;
			
			var middle = Math.floor(arr.length / 2);
			var left = arr.slice(0, middle);
			var right = arr.slice(middle);
	    return timedMerge(mergeSort(left), mergeSort(right));
	  };
	  mergeSort(arr);

	},
	compare: function(array) {
		var arr = array.slice();

		var merge = function(left, right) {
			var result = [];
			var iLeft = 0;
			var iRight = 0;

			while (iLeft < left.length && iRight < right.length) {
				sorts['mergeSort'].itterations++;
				if (left[iLeft].val < right[iRight].val) result.push(left[iLeft++]);
				else result.push(right[iRight++]);
			}

			return result.concat(left.slice(iLeft)).concat(right.slice(iRight));
		};

		var mergeSort = function(array) {
			sorts['mergeSort'].itterations++;
			if (array.length < 2) return array;
			var arr = array.slice();
			
			var middle = Math.floor(arr.length / 2);
			var left = arr.slice(0, middle);
			var right = arr.slice(middle);
	    return merge(mergeSort(left), mergeSort(right));
	  };
		
		var result = mergeSort(arr);
		return result;
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
		  	if(arr[i].val > pivot.val) {
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
    	if(arr[i].val < pivot.val) left.push(arr[i]);
    	else right.push(arr[i]);
    }
    return this.compare(left).concat(pivot, this.compare(right));
	}
};

