var Promisifier = require('./promisifier'); 
var workflow = require('./promisesWorkflowTest.js'); 
var assert = require('assert'); 

function PromiseConsumer(promisifier, theItems) {
	//************************ 
	//**** Private methods ***
	//************************ 
	function GenerateSumPromises(arr) {
			var ps = []; 
			for (var j=0; j<arr.length; j+=2) {
				ps.push(promisifier.sumPromise(arr[j],(arr[j+1]||0)))
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
	 
	function GenerateMultPromises(arr) {
			var ps = []; 
			for (var j=0; j<arr.length; j+=2) {
				ps.push(promisifier.multPromise(arr[j],arr[j+1]))
			}
			return Promise.all(ps)
				.then(function(values) {
					if (values.length>1) {
						return GenerateMultPromises(values); 
					}  else {
						return values[0];  
					} 
				}); 
		}; 

	function GenerateSubstractPromises(arr, resultToSubstract) {
			var p = GenerateSumPromises(arr); 
			return p.then(function(sum){
				return promisifier.substractPromise(resultToSubstract, sum); 
			}); 
		}; 
	//************************ 
	//**** Public methods ****
	//************************ 
this.Calculate = function() {

	var promiseArr = GenerateSumPromises(theItems); 
	 return promiseArr
		 .then(function(sumValue){
		 	var theItemsEvenValues = theItems.filter(function(c){
		 		return (c%2==0?c:null)
		 	}); 
		 	return GenerateMultPromises(theItemsEvenValues)
			 	.then(function(multValues){
			 		return multValues+sumValue; 
		 	})
	 })
	 .then(function(sumValue){
	 	var theItemsOddValues = theItems.filter(function(c){
	 		return (c%2!==0?c:null)
	 	}); 
	 	return GenerateSubstractPromises(theItemsOddValues, sumValue); 
	 })
	 .then(function(subValue){
	 	assert(subValue===workflow.testWorkflow(theItems),"Equal"); 
	 	return subValue; 
	 })
	 .catch(function(err){
	 	console.dir(err); 
	 	throw err; 
	 }); 
	 
	}
}

var theItems = [1, 2, 3, 11, 123, 423, 21, 123, 2, 0, 1, -1, -4, 13, 28, 37, 55, 45];  

var promConsumer = new PromiseConsumer(Promisifier, theItems); 
var result = promConsumer.Calculate()
.then( function(res) {
	console.log(res)
}); 
