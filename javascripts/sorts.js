var sorts = {};

// Each sort function is it's own object which takes an array (which it
// will sort), and a function 'update' which it will call to update the d3
// upon each itteration.
sorts.shiftSort = function(array) {
	arr = array.slice();
	var itterations = 0;
	(function timedLoop(i) {
		setTimeout(function() {
			if (arr[i] < arr[i+1]) {
	      var temp = arr[i];
	      arr[i] = arr[i+1];
	      arr[i+1] = temp;
	      i -= 2;
	    	update(arr);
	    }
	    itterations++;
	    $('#itterations').text(itterations);
	    if (i < arr.length) timedLoop(++i);
		}, 1)
	})(0);
  return arr;
};

sorts.bubbleSort = function(array, itterations, noChange) {
	arr = array.slice();
	itterations = itterations || 0;
  // base case
  if (noChange) {
  	update(arr);
  	return arr;
  }
  // recursive case
  var noChange = true;
	(function innerloop(i) {
		setTimeout(function() {
	  	if (arr[i] < arr[i+1]) {
	  		var temp = arr[i];
	  		arr[i] = arr[i+1];
	  		arr[i+1] = temp;
	  		noChange = false;
	  		update(arr);
	  	}
	  	itterations++;
	  	$('#itterations').text(itterations);
	    if (i < arr.length) innerloop(++i);
	    else sorts.bubbleSort(arr, itterations, noChange);
		}, 1)
	})(0);
};

