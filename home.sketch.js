var axiom = "F"
var sentence = axiom
var rules = []
var len = 100;
var currentLen = len;
var angle = 25
var scaling = .5
var generation = 0

var startPosition;

rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

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
  //createP(sentence)
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


function setup() {
  var cnv = createCanvas(600, 600);
  background(51)
  cnv.parent("canvas")
  angleMode(DEGREES)
  //createDiv("Rule")
  var ruleInput = createInput(rules[0].b)
  ruleInput.parent("rule")
  //createDiv("Angle")
  var angleInput = createInput(angle)
  angleInput.parent("angle")
  //createDiv("Line Draw Length")
  var drawLengthInput = createInput(len)
  drawLengthInput.parent("len")
  //createDiv("Generational Scaling")
  var scalingInput = createInput(scaling)
  scalingInput.parent("scale")
  startPosition = createCheckbox("Center", false)
  //startPosition.changed(moveOrigin)
  startPosition.parent("start")
  var button1 = createButton("Update parameters")
  button1.parent("buttons")
  var button2 = createButton("Generate")
  button2.parent("buttons")
  var button3 = createButton("Reset Canvas")
  button3.parent("buttons")
  turtle()
  //document.getElementById("paramDisplay").innerHTML = displayCurrents();
  displayCurrents()
  var updateParams = () => {rules[0].b = ruleInput.value();
  angle = angleInput.value();
  len = drawLengthInput.value();
  currentLen = len;
  scaling = scalingInput.value();
  displayCurrents();}
  button1.mousePressed(updateParams)
  button2.mousePressed(generate)
  button3.mousePressed(resetCanvas)
}

function displayCurrents() {
	document.getElementById("paramDisplay").innerHTML = "<b>Rule:</b> " + str(rules[0].b) + "</br>" +
	"<b>Angle:</b> " + angle + "</br>" +
	"<b>Line Draw Length:</b> " + len + "</br>" +
	"<b>Scaling:</b> " + scaling;
}