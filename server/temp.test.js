
var myObj= {
	a : 1
},
mySec = {
	b: 2
};

var the_array = [];
	
	the_array.push(mySec);
	the_array.push(myObj);

	console.log(the_array, the_array.indexOf(myObj))

	for (var i =0; i<the_array.length; i++) {
		if (the_array[i]=== myObj) {
			console.log('myObj found');
			the_array.splice(i,1);
		}
	}

	console.log(the_array)

