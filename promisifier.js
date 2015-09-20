function Promisifier(cb) {
    return function() {
        return Promise.resolve(cb.apply(cb, Array.prototype.slice.call(arguments)));
    };
}

var sumPromise = Promisifier(function(a, b) {
    return a + b;
});

var multPromise = Promisifier(function(a, b) {
    return a * b;
});

var substractPromise = Promisifier(function(a, b) {
    return a - b;
}); 


var theItems = [1, 2, 3, 11, 123, 423, 21, 123, 2, 0, 1, -1, -4, 13, 28, 37, 55, 45]; 
var n = []; 
for (var j=0; j<theItems.length; j++) {
	// console.log(n); 
	// console.log(2*theItems[j]); 
	n[j] = theItems[j]*2; 
} 

console.dir(n); 

function GenerateSumPromises(arr) {
		var ps = []; 
		for (var j=0; j<arr.length; j+=2) {
			ps.push(sumPromise(arr[j],(arr[j+1]||0)))
		}
		return Promise.all(ps)
		.then(function(values) {
			if (values.length>1) {
				return GenerateSumPromises(values); 
			}  else {
				return values[0];  
			} 
		}); 
	}; 
 
function GenerateMultPromises(arr, evenValue) {
		var ps = []; 
		for (var j=0; j<arr.length; j+=1) {
			ps.push(multPromise(arr[j],evenValue))
		}
		return Promise.all(ps)
		.then(function(values) {
			return values; 
		}); 
	}; 

function GenerateSubstractPromises(arr, resultToSubstract) {
		var ps = []; 
		console.log("AAAAA" + resultToSubstract); 
		console.log("BBBBB " + arr); 
		for (var j=0; j<arr.length; j+=1) {
			ps.push(substractPromise(resultToSubstract, arr[j]))
		}
		return Promise.all(ps)
		.then(function(values) {
			console.dir(values); 
			return values[values.length-1]; 
		}); 
	}; 

var promiseArr = GenerateSumPromises(theItems); 
 promiseArr
 .then(function(sumValue){
 	console.log(sumValue); 
 	return GenerateMultPromises(theItems, 2)
 	.then(function(multValues){
 		multValues.push(sumValue); 
 		return multValues; 
 	})   
 })
 .then(function(multValues){
 	return GenerateSumPromises(multValues); 
 })
 .then(function(sumValue){
 	var theItemsEvenValues = theItems.filter(function(c){
 		return (c%2!==0?c:null)
 	}); 
 	console.log(theItemsEvenValues); 
 	return GenerateSubstractPromises(theItemsEvenValues, sumValue); 
 })
 .then(function(subValue){
 	console.dir(subValue); 
 }); 




 




