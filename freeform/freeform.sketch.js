//Initial parameter setup
var axiom = "F"
var sentence = axiom
var rules = []
var len = 100;
var currentLen = len;
var angle = 25
var scaling = .6
var generation = 0

//Initial ui variable setup
var startPosition;
var ruleStartInput;
var ruleProbabilityInput;
var ruleEndInput;
var isStochastic;

//Animation ui variable setup
var maxGeneration;
var incrementAngle;
var incrementScale;
var startAnimation;
var stopAnimation;
var speedUp;

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
  sentence = axiom
  currentLen = len
  generation = 0
  turtle()
}

function resetDefaults(){
	axiom = "F"
	sentence = axiom
	rules[0] = {
		a: "F",
		b: "FF+[+F-F-F]-[-F+F+F]",
		c: 1
	}
	len = 100;
	currentLen = len;
	angle = 25
	scaling = .6
	displayCurrents()
}

//Adds the user inputtted rule to the end of the rule array
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
	if(isStochastic.checked()){
		rules = [randomRule("F",{symbol:"",forceInclude:false},{symbol:"",forceInclude:false},true)]
	} else {
		rules = [randomRule("F",{symbol:"",forceInclude:false},{symbol:"",forceInclude:false},false)]
	}
	displayCurrents()
}

//Replaces current rules with two random rules
function twoRandomRules(){
	if(isStochastic.checked()){
		rules = [
			randomRule("F",{symbol:"A",forceInclude:true},{symbol:"",forceInclude:false},true),
			randomRule("A",{symbol:"A",forceInclude:false},{symbol:"",forceInclude:false},true)
		]
	} else {
		rules = [
			randomRule("F",{symbol:"A",forceInclude:true},{symbol:"",forceInclude:false},false),
			randomRule("A",{symbol:"A",forceInclude:false},{symbol:"",forceInclude:false},false)
		]
	}
	displayCurrents()
}

//Replaces current rules with three random rules
function threeRandomRules(){
	if(isStochastic.checked()){
		rules = [
			randomRule("F",{symbol:"A",forceInclude:true},{symbol:"",forceInclude:false},true),
			randomRule("A",{symbol:"B",forceInclude:true},{symbol:"",forceInclude:false},true),
			randomRule("B",{symbol:"A",forceInclude:false},{symbol:"B",forceInclude:false},true)
		]
	} else {
		rules = [
			randomRule("F",{symbol:"A",forceInclude:true},{symbol:"",forceInclude:false},false),
			randomRule("A",{symbol:"B",forceInclude:true},{symbol:"",forceInclude:false},false),
			randomRule("B",{symbol:"A",forceInclude:false},{symbol:"B",forceInclude:false},false)
		]
	}
	displayCurrents()
}

//Animation global variables
var animating = false;
var timeoutId;

//Begins the animation loop
function startAnim(){
	if(!animating){
		animating = true;
		setTimeout(animHelper(), 1000)
	}
}

//Helper for the recursive animation loop
function animHelper(){
	if(speedUp.checked()){
		timeoutId = setTimeout(function(){if(generation < maxGeneration.value()){
			//maxGeneration.value();
			generate()
			if(animating == true) {
				animHelper()
			}
		} else { resetCanvas(); angle += int(incrementAngle.value());
			scaling += Math.round(float(incrementScale.value())*10)/10; displayCurrents(); if(animating == true){animHelper()}	}}, 500)
	} else {
		timeoutId = setTimeout(function(){if(generation < maxGeneration.value()){
			//maxGeneration.value();
			generate()
			if(animating == true) {
				animHelper()
			}
		} else { resetCanvas(); angle += int(incrementAngle.value());
			scaling += Math.round(float(incrementScale.value()) * 10)/10; displayCurrents(); if(animating == true){animHelper()}	}}, 1000)
	}
}

//Stops an ongoing animation
function stopAnim(){
	clearTimeout(timeoutId);
	animating = false;
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

function windowResized(){
	resizeCanvas(innerWidth*.6,innerHeight*.9)
	resetCanvas()
}

//Initial setup of the canvas and ui
function setup() {
  var cnv = createCanvas(innerWidth * .6,innerHeight * .9);
  background(51)
  cnv.parent("canvas")
  angleMode(DEGREES)
  
  //Updates parameters with input values
  var updateParams = () => {
  axiom = axiomInput.value();
  sentence = axiom;
  angle = int(angleInput.value());
  len = int(drawLengthInput.value());
  currentLen = len;
  scaling = Math.round(float(scalingInput.value())*10)/10;
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
  var axiomInput = createInput(axiom)
  axiomInput.parent("axiom")
  var angleInput = createInput(angle)
  angleInput.parent("angle")
  var drawLengthInput = createInput(len)
  drawLengthInput.parent("len")
  var scalingInput = createInput(scaling)
  scalingInput.parent("scale")
  startPosition = createCheckbox("Center", false)
  startPosition.parent("start")
  isStochastic = createCheckbox("Stochastic", false)
  isStochastic.parent("isStochastic")
  var button1 = createButton("Update parameters")
  button1.parent("buttons")
  var button2 = createButton("Generate")
  button2.parent("buttons")
  var button3 = createButton("Reset Canvas")
  button3.parent("buttons")
  var button4 = createButton("Reset Defaults")
  button4.parent("buttons")
  button1.mousePressed(updateParams)
  button2.mousePressed(generate)
  button3.mousePressed(resetCanvas)
  button4.mousePressed(resetDefaults)
  
  //Visibility toggle ui
  var sentenceVisibility = createButton("Hide/Show Sentence")
  sentenceVisibility.parent("hide/showSentence")
  sentenceVisibility.mousePressed(hideShow)
  
  //Animation controls setup
  maxGeneration = createInput(4)
  maxGeneration.size(20)
  maxGeneration.parent("maxGen")
  incrementAngle = createInput("0")
  incrementAngle.size(20)
  incrementAngle.parent("incrementAngle")
  incrementScale = createInput("0")
  incrementScale.size(25)
  incrementScale.parent("incrementScale")
  startAnimation = createButton("Start")
  stopAnimation = createButton("Stop")
  startAnimation.parent("animationButtons")
  stopAnimation.parent("animationButtons")
  startAnimation.mousePressed(startAnim)
  stopAnimation.mousePressed(stopAnim)
  speedUp = createCheckbox("2x speed", false)
  speedUp.parent("x2Speed")
  
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
	"<b>Axiom:</b> " + axiom + "</br>" +
	"<b>Angle:</b> " + angle + "</br>" +
	"<b>Line Draw Length:</b> " + len + "</br>" +
	"<b>Scaling:</b> " + scaling.toFixed(1);
}