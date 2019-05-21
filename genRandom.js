var symbols = ["F","+","-","[","]","A","B","a","b"];

var fRule = {a: "F", b: ""};
var aRule = {a: "A", b: ""};
var bRule = {a: "B", b: ""};

function randomFRule() {
	var ruleBase = "";
	var containsAB = false;
	
	var numberOfSymbols = Math.floor(Math.random() * 7) + 6;
	var minNumF = Math.floor(Math.random() * 3) + 2;
	
	for(var i = 0; i<numberOfSymbols; i++){
		var temp = symbols[Math.floor(Math.random() * symbols.length)];
		if(temp == "F"){
			minNumF --;
		}
		if(temp == "A" || temp == "B"){
			containsAB = true;
		}
		ruleBase += temp;
	}
	
	if(!containsAB){
		var chanceAB = Math.random()
	
		if(chanceAB > 0.5){
			var tempIndex = Math.floor(Math.random() * ruleBase.length);
			ruleBase = ruleBase.slice(0,tempIndex) + "A" + ruleBase.slice(tempIndex);
			chanceAB = Math.random();
			if(chanceAB > 0.5){
				var tempIndex = Math.floor(Math.random() * ruleBase.length);
				ruleBase = ruleBase.slice(0,tempIndex) + "B" + ruleBase.slice(tempIndex);
			} else {
				var tempIndex = Math.floor(Math.random() * ruleBase.length);
				ruleBase = ruleBase.slice(0,tempIndex) + "B" + ruleBase.slice(tempIndex);
			}
		}
	}
	
	if(minNumF > 0){
		for(var i = 0; i<minNumF; i++){
			var tempIndex = Math.floor(Math.random() * ruleBase.length);
			ruleBase = ruleBase.slice(0,tempIndex) + "F" + ruleBase.slice(tempIndex);
		}
	}
	
	console.log(ruleBase)
}