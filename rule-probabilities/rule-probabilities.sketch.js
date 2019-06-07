//Initial parameter setup
var axiom = "F"
var sentence = axiom
var rules = []
var len = 100;
var currentLen = len;
var angle = 25
var scaling = .5
var generation = 0

//Initial ui variable setup
var startPosition;
var ruleStartInput;
var ruleProbabilityInput;
var ruleEndInput;

//Default rule
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]",
  c: 1
}

//Takes the previous sentence and generates the next sentence
function generate() {
  currentLen *= scaling
  generation += 1
  var nextSentence = ""
  for(var i = 0; i<sentence.length; i++){
    var currentChar = sentence.charAt(i)
    for(var j = 0; j<rules.length; j++){
      var found = false
	  var chance = Math.random()
	  if(generation - 1 == 0 && currentChar == rules[j].a){
		found = true
		nextSentence += rules[j].b
		break;
	  }
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

//Converts the sentence into drawing instructions and updates generationDisplay and sentecneDisplay
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
  document.getElementById("generationDisplay").innerHTML = "<b>Current Generation:</b> " + generation
  document.getElementById("sentenceDisplay").innerHTML = sentence
}

//Empties the canvas and resets the parameters to their initial settings
function resetCanvas(){
  clear()
  background(51)
  sentence = "F"
  currentLen = len
  generation = 0
  turtle()
}

//Adds the user inputted rule to the end of the rule array
function addRuleFunc(){
	rules.push({a: ruleStartInput.value(), b: ruleEndInput.value(), c:ruleProbabilityInput.value()})
	displayCurrents()
}

//Removes the last rule in the rules array
function removeRuleFunc(){
	rules.pop()
	displayCurrents()
}

//Replaces current rules with one random rule
function oneRandomRule(){
	rules = [randomRule("F",{symbol:"",forceInclude:false},{symbol:"",forceInclude:false},true)]
	displayCurrents()
}

//Replaces current rules with two random rules
function twoRandomRules(){
	rules = [
		randomRule("F",{symbol:"A",forceInclude:true},{symbol:"",forceInclude:false},true),
		randomRule("A",{symbol:"A",forceInclude:false},{symbol:"",forceInclude:false},true)
	]
	displayCurrents()
}

//Replaces current rules with three random rules
function threeRandomRules(){
	rules = [
		randomRule("F",{symbol:"A",forceInclude:true},{symbol:"",forceInclude:false},true),
		randomRule("A",{symbol:"B",forceInclude:true},{symbol:"",forceInclude:false},true),
		randomRule("B",{symbol:"A",forceInclude:false},{symbol:"B",forceInclude:false},true)
	]
	displayCurrents()
}

//Toggles visibility of sentenceDisplay
function hideShow () {
	var sentence = document.getElementById("sentenceDisplay")
	if(sentence.style.display !== "none"){
		sentence.style.display = "none"
	} else {
		sentence.style.display = "block"
	}
}

//Initial setup of the canvas and ui
function setup() {
  var cnv = createCanvas(600, 600);
  background(51)
  cnv.parent("canvas")
  angleMode(DEGREES)
  
  //Updates parameters with input values
  var updateParams = () => {
  angle = angleInput.value();
  len = drawLengthInput.value();
  currentLen = len;
  scaling = scalingInput.value();
  displayCurrents();}
  
  //Rule ui setup
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
  addRule.mousePressed(addRuleFunc)
  removeRule.mousePressed(removeRuleFunc)
  
  //Random rule ui setup
  var oneRule = createButton("One rule L-System")
  var twoRules = createButton("Two rule L-System")
  var threeRules = createButton("Three rule L-System")
  oneRule.parent("oneRule")
  twoRules.parent("twoRules")
  threeRules.parent("threeRules")
  oneRule.mousePressed(oneRandomRule)
  twoRules.mousePressed(twoRandomRules)
  threeRules.mousePressed(threeRandomRules)
  
  //Parameter and canvas controls setup
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
  button1.mousePressed(updateParams)
  button2.mousePressed(generate)
  button3.mousePressed(resetCanvas)
  
  //Visibility toggle ui
  var sentenceVisibility = createButton("Hide/Show Sentence")
  sentenceVisibility.parent("hide/showSentence")
  sentenceVisibility.mousePressed(hideShow)
  
  turtle()
  displayCurrents()
}

//Updates the list of rules and paramDisplay with current parameter values
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