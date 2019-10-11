function count() {
	var input = document.getElementById("input").value;
	var out = document.getElementById('out');
	var arrayOfStrings = input.split(" ");
	var myMap = new Map();

	for (var i = 0; i < arrayOfStrings.length; i++) {
		if (!myMap.has(arrayOfStrings[i])) {
			myMap.set(arrayOfStrings[i], 1);
		}
		else{
			let val = myMap.get(arrayOfStrings[i]) + 1;
			myMap.set(arrayOfStrings[i], val);
		}
	}
	for (var [key, value] of myMap) {
		console.log(key + ' = ' + value);
	}	
}