function randomRule(ruleStart,symbol1,symbol2, stochastic) {
	var symbols = ["F","+","-","[","]"];
	
	var containsSymbol1 = false;
	var containsSymbol2 = false;
	
	if(symbol1.symbol == ""){
		symbols.push(symbol1.symbol)
	}
	if(!symbol2.symbol == ""){
		symbols.push(symbol2.symbol)
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
		if(temp == symbol1.symbol){
			containsSymbol1 = true;
		}
		if(temp == symbol2.symbol){
			containsSymbol2 = true;
		}
		previousSymbol = temp;
		ruleBase += temp;
	}
	
	if(symbol1.forceInclude){	
		if(symbol1.symbol == ""){
			containsSymbol1 = true;
		}
		
		if(!containsSymbol1){
			var tempIndex = Math.floor(Math.random() * ruleBase.length);
			ruleBase = ruleBase.slice(0,tempIndex) + symbol1.symbol + ruleBase.slice(tempIndex);
		}
	}
	
	if(symbol2.forceInclude){
		if(symbol2.symbol == ""){
			containsSymbol2 = true;
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
	var probability;
	
	if(stochastic){
		probability = Math.round((Math.random() *.6 + .3) * 100) / 100
	} else {
		probability = 1
	}
	
	return({a: ruleStart, b: ruleBase, c: probability})
}