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

//Default rule
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
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
      if(currentChar == rules[j].a) {
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

//Converts the sentence into drawing instructions and updates generationDisplay
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

//Empties the canvas and resets the parameters to their initial settings
function resetCanvas(){
  clear()
  background(51)
  sentence = "F"
  currentLen = len
  generation = 0
  turtle()
}

//Initial setup of the canvas and ui
function setup() {
  var cnv = createCanvas(600, 600);
  background(51)
  cnv.parent("canvas")
  angleMode(DEGREES)
  
  //Updates parameters with input values
  var updateParams = () => {rules[0].b = ruleInput.value();
  angle = angleInput.value();
  len = drawLengthInput.value();
  currentLen = len;
  scaling = scalingInput.value();
  displayCurrents();}
  
  //Parameter and canvas controls setup
  var ruleInput = createInput(rules[0].b)
  ruleInput.parent("rule")
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
  
  turtle()
  displayCurrents()
}

//Updates paramDisplay with current parameter values
function displayCurrents() {
	document.getElementById("paramDisplay").innerHTML = "<b>Rule:</b> " + str(rules[0].b) + "</br>" +
	"<b>Angle:</b> " + angle + "</br>" +
	"<b>Line Draw Length:</b> " + len + "</br>" +
	"<b>Scaling:</b> " + scaling;
}