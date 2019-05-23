function randomRule(ruleStart,includeSymbol1,includeSymbol2, forceInclude) {
	var symbols = ["F","+","-","[","]"];
	
	var containsSymbol1 = false;
	var containsSymbol2 = false;
	
	if(!includeSymbol1 == ""){
		symbols.push(includeSymbol1)
	}
	if(!includeSymbol2 == ""){
		symbols.push(includeSymbol2)
	}
	
	var ruleBase = "";
	
	var numberOfSymbols = Math.floor(Math.random() * 7) + 6;
	var minNumF = Math.floor(Math.random() * 3) + 2;
	
	var previousSymbol = "";
	var openBrace = false;
	
	for(var i = 0; i<numberOfSymbols; i++){
		var valuableSymbols = symbols;
		if(previousSymbol == "["){
			valuableSymbols = symbols.slice(0,3)
		}
		if(previousSymbol == "+"){
			valuableSymbols = symbols.slice(0,2).concat(symbols.slice(3))
		}
		if(previousSymbol == "-"){
			valuableSymbols = symbols.slice(0,1).concat(symbols.slice(2))
		}
		var temp = valuableSymbols[Math.floor(Math.random() * valuableSymbols.length)];
		if(temp == "["){
			openBrace = true;
		}
		while(temp == "]" && !openBrace){
			temp = valuableSymbols[Math.floor(Math.random() * valuableSymbols.length)]
		}
		if(temp == "]"){
			openBrace = false;
		}
		if(temp == "F"){
			minNumF --;
		}
		if(temp == includeSymbol1){
			containsSymbol1 = true;
		}
		if(temp == includeSymbol2){
			containsSymbol2 = true;
		}
		previousSymbol = temp;
		ruleBase += temp;
	}
	if(forceInclude){	
		if(includeSymbol1 == ""){
			containsSymbol1 = true;
		}
		if(includeSymbol2 == ""){
			containsSymbol2 = true;
		}
		
		if(!containsSymbol1){
			var tempIndex = Math.floor(Math.random() * ruleBase.length);
			ruleBase = ruleBase.slice(0,tempIndex) + includeSymbol1 + ruleBase.slice(tempIndex);
		}
		if(!containsSymbol2){
			var tempIndex = Math.floor(Math.random() * ruleBase.length);
			ruleBase = ruleBase.slice(0,tempIndex) + includeSymbol2 + ruleBase.slice(tempIndex);
		}
	}
	
	if(minNumF > 0){
		for(var i = 0; i<minNumF; i++){
			var tempIndex = Math.floor(Math.random() * ruleBase.length);
			ruleBase = ruleBase.slice(0,tempIndex) + "F" + ruleBase.slice(tempIndex);
		}
	}
	return({a: ruleStart, b: ruleBase})
}