exports.testWorkflow = function(theItems){
	if (!theItems) throw new Error("No array values defined"); 
	var n = []; 
	var t = 0; 
	var s = 1; 
	for (var j=0; j<theItems.length; j++) {
		t += theItems[j]; 
	} 
	for (var j=0; j<theItems.length; j++) {
		var v = theItems[j]; 
		if (v%2==0 && v!==0) 
		s*=v; 
	} 
	var b = s+t; 
	var o = 0; 
	for (var j=0; j<theItems.length; j++) {
		o += (theItems[j]%2!==0?theItems[j]:0); 
	} 
	return (b-o); 
}
