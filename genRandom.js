var symbols = ["F","+","-","[","]","A","B"];

function randomRule(includeSymbol1,includeSymbol2) {
	var ruleBase = "";
	var containsSymbol1 = false;
	var containsSymbol2 = false;
	
	if(includeSymbol1 == ""){
		containsSymbol1 = true;
	}
	if(includeSymbol2 == ""){
		containsSymbol2 = true;
	}
	
	var numberOfSymbols = Math.floor(Math.random() * 7) + 6;
	var minNumF = Math.floor(Math.random() * 3) + 2;
	
	for(var i = 0; i<numberOfSymbols; i++){
		var temp = symbols[Math.floor(Math.random() * symbols.length)];
		if(temp == "F"){
			minNumF --;
		}
		if(temp == includeSymbol1){
			containsSymbol1 = true;
		}
		if(temp == includeSymbol2){
			containsSymbol2 = true;
		}
		ruleBase += temp;
	}
	
	if(!containsSymbol1){
		var tempIndex = Math.floor(Math.random() * ruleBase.length);
		ruleBase = ruleBase.slice(0,tempIndex) + includeSymbol1 + ruleBase.slice(tempIndex);
		console.log("Including " + includeSymbol1)
	}
	if(!containsSymbol2){
		var tempIndex = Math.floor(Math.random() * ruleBase.length);
		ruleBase = ruleBase.slice(0,tempIndex) + includeSymbol2 + ruleBase.slice(tempIndex);
		console.log("Including " + includeSymbol2)
	}
	
	if(minNumF > 0){
		for(var i = 0; i<minNumF; i++){
			var tempIndex = Math.floor(Math.random() * ruleBase.length);
			ruleBase = ruleBase.slice(0,tempIndex) + "F" + ruleBase.slice(tempIndex);
		}
	}
	
	console.log(ruleBase)
}