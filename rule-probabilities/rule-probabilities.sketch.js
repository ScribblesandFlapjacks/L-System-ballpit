var axiom = "F"
var sentence = axiom
var rules = []
var len = 100;
var currentLen = len;
var angle = 25
var scaling = .5
var generation = 0

var startPosition;
var ruleStartInput;
var ruleProbabilityInput;
var ruleEndInput;

rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]",
  c: 1
}

function generate() {
  currentLen *= scaling
  generation += 1
  var nextSentence = ""
  for(var i = 0; i<sentence.length; i++){
    var currentChar = sentence.charAt(i)
    for(var j = 0; j<rules.length; j++){
      var found = false
	  var chance = Math.random()
      if(currentChar == rules[j].a && chance < rules[j].c) {
        found = true
        nextSentence += rules[j].b
        break;
      }
    }
    if(!found){
      nextSentence += currentChar
    }
  }
  sentence = nextSentence
  turtle()
}

function turtle(){
  background(51)
  resetMatrix()
  if(!startPosition.checked()){
	translate(width/2,height)
  } else {
	translate(width/2, height/2)
  }
  stroke(255, 100)
  for(var i = 0; i<sentence.length; i++){
    currentChar = sentence.charAt(i)
    
    if(currentChar == "F"){
      line(0,0,0,-currentLen)
      translate(0,-currentLen)
    } else if(currentChar == "+"){
      rotate(angle)
    } else if(currentChar == "-"){
      rotate(-angle)
    } else if(currentChar == "["){
      push()
    } else if(currentChar == "]"){
      pop()
    }
  }
  document.getElementById("generationDisplay").innerHTML = "<b>Current Generation:</b> " + generation + "</br>" +
															"<b>Current Sentence:</b> " + sentence;
}

function resetCanvas(){
  clear()
  background(51)
  sentence = "F"
  currentLen = len
  generation = 0
  turtle()
}

function moveOrigin(){
	if(this.checked()){
		translate(width/2,height/2)
	} else {
		translate(width/2,height)
	}
}

function addRuleFunc(){
	rules.push({a: ruleStartInput.value(), b: ruleEndInput.value(), c:ruleProbabilityInput.value()})
	displayCurrents()
}

function removeRuleFunc(){
	rules.pop()
	displayCurrents()
}

function oneRandomRule(){
	rules = [randomRule("F",{symbol:"",forceInclude:false},{symbol:"",forceInclude:false},true)]
	displayCurrents()
}

function twoRandomRules(){
	rules = [
		randomRule("F",{symbol:"A",forceInclude:true},{symbol:"",forceInclude:false},true),
		randomRule("A",{symbol:"A",forceInclude:false},{symbol:"",forceInclude:false},true)
	]
	displayCurrents()
}

function threeRandomRules(){
	rules = [
		randomRule("F",{symbol:"A",forceInclude:true},{symbol:"",forceInclude:false},true),
		randomRule("A",{symbol:"B",forceInclude:true},{symbol:"",forceInclude:false},true),
		randomRule("B",{symbol:"A",forceInclude:false},{symbol:"B",forceInclude:false},true)
	]
	displayCurrents()
}


function setup() {
  var cnv = createCanvas(600, 600);
  background(51)
  cnv.parent("canvas")
  angleMode(DEGREES)
  
  ruleStartInput = createInput(rules[0].a)
  ruleStartInput.size(10)
  ruleStartInput.parent("ruleStart")
  ruleProbabilityInput = createInput(rules[0].c)
  ruleProbabilityInput.size(30)
  ruleProbabilityInput.parent("ruleProbability")
  ruleEndInput = createInput(rules[0].b)
  ruleEndInput.parent("ruleEnd")
  var addRule = createButton("Add Rule")
  var removeRule = createButton("Remove Rule")
  addRule.parent("ruleButtons")
  removeRule.parent("ruleButtons")
  
  var oneRule = createButton("One rule L-System")
  var twoRules = createButton("Two rule L-System")
  var threeRules = createButton("Three rule L-System")
  oneRule.parent("oneRule")
  twoRules.parent("twoRules")
  threeRules.parent("threeRules")
  
  var angleInput = createInput(angle)
  angleInput.parent("angle")
  var drawLengthInput = createInput(len)
  drawLengthInput.parent("len")
  var scalingInput = createInput(scaling)
  scalingInput.parent("scale")
  startPosition = createCheckbox("Center", false)
  startPosition.parent("start")
  var button1 = createButton("Update parameters")
  button1.parent("buttons")
  var button2 = createButton("Generate")
  button2.parent("buttons")
  var button3 = createButton("Reset Canvas")
  button3.parent("buttons")
  turtle()
  displayCurrents()
  var updateParams = () => {
  angle = angleInput.value();
  len = drawLengthInput.value();
  currentLen = len;
  scaling = scalingInput.value();
  displayCurrents();}
  
  button1.mousePressed(updateParams)
  button2.mousePressed(generate)
  button3.mousePressed(resetCanvas)
  addRule.mousePressed(addRuleFunc)
  removeRule.mousePressed(removeRuleFunc)
  oneRule.mousePressed(oneRandomRule)
  twoRules.mousePressed(twoRandomRules)
  threeRules.mousePressed(threeRandomRules)
}

function displayCurrents() {
	var sentence = "<b>Rules<b>" + "</br>"
	for(var i = 0; i<rules.length;i++){
		sentence += str(rules[i].a) + "[" + rules[i].c + "]" + " -> " + str(rules[i].b) + "</br>"
	}
	document.getElementById("paramDisplay").innerHTML = sentence + "</br>" +
	"<b>Angle:</b> " + angle + "</br>" +
	"<b>Line Draw Length:</b> " + len + "</br>" +
	"<b>Scaling:</b> " + scaling;
}