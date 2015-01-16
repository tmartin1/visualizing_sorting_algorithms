// Helper function to process swapping of two elements in an array.
var swap = function(arr, a, b) {
	if (a === b) return;
	var temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
};

// Object to hold all sort functions and properties.
var sorts = {};

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
	  	steps.push({ animation: 'highlight', color: searchColor, data: focus });
	  	if (arr[i+1] && arr[i].val > arr[i+1].val) {
	      steps.push({ animation: 'swap', data1: arr[i], data2: arr[i+1] });
	  		swap(arr, i, i+1);
	  		changed = true;
	  	} else {
	  		steps.push({ animation: 'clearHighlight', data: focus });
	  	}
	  	this.itterations++;
	  }
	  if (changed) this.display(arr, true, steps);
	  else {
	  	// List is fully sorted, highlight all in sortedColor.
	  	for (var i=0; i < arr.length; i++) {
	  		steps.push({ animation: 'highlight', color: sortedColor, data: arr[i] });
	  	}
	  	return (animate) ? animateSteps(steps) : this.itterations;
	  }
	}
};

// display working
sorts.insertionSort = {
	name: 'Insertion Sort',
	itterations: 0,
	display: function(array, animate) {
		var steps = [];
		var arr = array.slice();
	  for (var i=0; i < arr.length; i++) {
	  	var focus = arr.slice()[i];
	  	steps.push({ animation: 'highlight', color: sortedColor, data: focus });
	    if (arr[i] && arr[i+1] && arr[i].val > arr[i+1].val) {
	  		steps.push({ animation: 'highlight', color: searchColor, data: arr[i+1] });
	      steps.push({ animation: 'swap', data1: arr[i], data2: arr[i+1] });
	      swap(arr, i, i+1);
	  		steps.push({ animation: 'clearHighlight', data: arr[i+1] });
	      i = i-2 >= -1 ? i-2 : i-1;
	    }
	    this.itterations++;
	  }
		if (animate) animateSteps(steps);
	}
};


// display working
sorts.selectionSort = {
	name: 'Selection Sort',
	itterations: 0,
	display: function(array, animate) {
		var steps = [];
		var arr = array.slice();
		for (var i=0; i<arr.length; i++) {
			var index = i;
			// after the next lowest element is placed in i, we don't need to search it again.
			for (var j=i; j<arr.length; j++) {
				this.itterations++;
				steps.push({ animation: 'highlight', color: searchColor, data: arr[j] });
				if (arr[j].val <= arr[index].val) {
					steps.push({ animation: 'clearHighlight', data: arr[index] });
					index = j;
					steps.push({ animation: 'highlight', color: searchColor, data: arr[index] });
				} else {
					steps.push({ animation: 'clearHighlight', data: arr[j] });
				}
			}
			steps.push({ animation: 'highlight', color: sortedColor, data: arr[index] });
			steps.push({ animation: 'swap', data1: arr[index], data2: arr[i] });
			swap(arr, index, i);
		}
		return animate ? animateSteps(steps) : this.itterations;
	}
};


// display not working
/*
sorts.heapSort = {
	name: 'Heap Sort',
	itterations: 0,
	display: function(array) {
		var arr = array.slice();
		var binaryArray = [];
		var result = [];

		// Build the binary sorted tree (array) from the initial array.


		// From the binary array, build the sorted array.


		return this.itterations;
	}
};
*/

// display is working
sorts.shellSort = {
	name: 'Shell Sort',
	itterations: 0,
	display: function(array, animate) {
		var arr = array.slice();
		var gaps = [];
		var steps = [];
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
				if (arr[j]) steps.push({ animation: 'highlight', color: searchColor, data: arr[j] });
				// Compare at existing indicies of arr[gap[i]], arr[gap[i*2]], etc.
				if (arr[j] && arr[j+gap] && arr[j].val > arr[j+gap].val) {
					if (gap === 1) steps.push({ animation: 'highlight', color: sortedColor, data: arr[j] });
					steps.push({ animation: 'swap', data1: arr[j], data2: arr[j+gap] });
					swap(arr, j, j+gap);
		      j -= 2*gap;
				} else {
					if (arr[j]) steps.push({ animation: 'highlight', color: gap===1 ? sortedColor : unsortedColor, data: arr[j] });
				}
				this.itterations++;
			}
		}
		return animate ? animateSteps(steps) : this.itterations;
	}
};


// display not working
sorts.mergeSort = {
	name: 'Merge Sort',
	itterations: 0,
	display: function(array, animate) {
		var arr = array.slice();

		var merge = function(left, right) {
			var result = [], iLeft = 0, iRight = 0;

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


// display not working
sorts.quickSort = {
	name: 'Quick Sort',
	itterations: 0,
	steps: [],
	display: function(array, animate) {
		if (array.length === 0) return sorts.quickSort.steps;
		var arr = array.slice();
		var left = [];
		var right = [];
		var pivot = arr[0];
    for (var i = 1; i < arr.length; i++) {
    	sorts.quickSort.steps.push({ animation: 'highlight', color: sortedColor, data: arr[i] });
    	if(arr[i].val < pivot.val) {
    		left.push(arr[i]);
    	} else {
    		right.push(arr[i]);
    	}
    	sorts.quickSort.steps.push({ animation: 'clearHighlight', data: arr[i] });
    }
    return sorts.quickSort.display(left, animate).concat(pivot, sorts.quickSort.display(right, animate));
    return (animate) ? animateSteps(steps) : this.itterations;
	}
};

