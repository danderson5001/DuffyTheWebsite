//skills
var words = ["Java","SQL", "Python", "c#", "Microsoft Office", "Html", "Git", "Docker", "VSCode", "Java Script"]
var words2 = ["Artificial Intelligence", "Programming Language Concepts","Databases and Web Design", "Objects and Design", "Algorithms", "Problem Solving Seminar", "Graphic Design", "Robotic Agents"]
document.addEventListener("DOMContentLoaded", function (){
    createTrain(words, "../icons/train.png", -1);       // normal train (right → left)
    createTrain(words2, "../icons/train_flip.png", 1);  // reverse train (left → right)
    scheduleRandomAction();

    Array.from(document.getElementsByClassName("flip-card-inner")).forEach(element => {
        element.onclick = function(){
            this.classList.toggle("active")
        }
    });

    Array.from(document.getElementsByClassName("hex-inner")).forEach(element => {
        element.onclick = function(){
            this.classList.toggle("active")
        }
    });
});


//Flight Stuff below here ------------------------------------------------------------------------------------------------------------

//Allows plane object to exist everywhere and other globals
const plane = document.createElement('img');
let x,y,screenx, screeny,rotation, curPointx, curPointy, myScreen, timer;
let locationx=0, locationy=0;
const turnPoints = [];
let ptInTP = 0;

let spinning = false;
let spinOffset = 0;
let spinSpeed = 20;

//this allows for the creation and run time of the plane
function scheduleRandomAction() {
    if(!document.body.contains(plane)) {
        preFlight();
        //20000 is about 20 seconds and 240000 is about 4 minutes
        const randomDelay =  2000;//Math.floor(Math.random() * (240000 - 20000  + 1)) + 20000 ; 
        setTimeout(() => {
            flight();
            scheduleRandomAction();
        }, randomDelay);
    }
}

//everything that needs to be set up for the plane to be able to exist but before any movement
function preFlight(){
    // Create plane image
    plane.src = '../icons/plane.png';
    plane.id = 'plane';
    plane.style.position = 'absolute';

    let start =  Math.random()*(window.innerHeight);
    x = 0;
    y = start;

    plane.style.left = x + 'px';
    plane.style.top = y + 'px';

    // Append to container (make sure planediv exists!)
    planediv.appendChild(plane);

    // Goals
    let goalx = window.innerWidth * 1.1;
    start =  Math.random()*(window.innerHeight);
    let goaly = start;
   
    //spin logic
    rotation = 0;

    //keeps tracking of which point we are heading for
    curPointx = 0;
    curPointy = 0;
}


//This method sets up the plane and calls the method that actually causes the plane to move
function flight() {
    console.log("plane");

    /*
        Assigns the path the plane will take by creating 
        7 random points acrross the screeen it must hit 
        - turnPoints is Global 
    **/
    for (let i = 0; i < 7; i++) {
        turnPoints.push([
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        ]);
    }

    turnPoints.push([
        window.innerWidth + 2, 
        Math.random() * window.innerHeight
    ])
    //I like the idea of sorting but it was inda boring looking, [[ fixed, it looks better
    turnPoints.sort((a, b) => a[0] - b[0]);

    // Movement
    timer = setInterval(run, 35);
    
    //called on
    function run(){
        flyAway();
    } 
}

//in charge of actually taking the flight path that was found
function flyAway(){
    
    if(turnPoints.length === 0){
        plane.remove();
        clearInterval(timer);
        return;
    }

    if(!spinning && Math.random() > 0.997){
        spinning = true;
    }
    
    if(spinning){
        spinOffset += spinSpeed;

        if(spinOffset >= 360){
            spinOffset = 0;
            spinning = false;
        }
    }

    var distx = turnPoints[0][0] - x;
    var disty = turnPoints[0][1] - y;
    var dist = Math.sqrt(distx*distx + disty*disty);
    if (dist < 7){
        //need to update x and y
        x = turnPoints[0][0];
        y = turnPoints[0][1];
        
        //.shift will remove the first element, similar as to how I was trying to use pop() originally
        turnPoints.shift();
    } else {
        // Move proportionally toward target
        x += (distx / dist) * 5;
        y += (disty / dist) * 5;

        //face rotation towards target
        let targetAngle = Math.atan2(disty, distx) * 180 / Math.PI;
        rotation += (targetAngle - rotation) * 0.1;
        plane.style.transform = `rotate(${rotation + spinOffset}deg)`;
    }

    plane.style.top= y + "px";
    plane.style.left = x + "px"; 
}

//---------------------------------------------------------------------------------------------------------------------
// ------ Trains

function createTrain(words, engineSrc, direction){

    const train = document.createElement("div");
    train.id = "train";
    train.style.marginTop = "45px";
    train.style.display = "flex";
    train.style.alignItems = "center";
    train.style.left = "-800px";   // start off screen
    train.style.bottom = "5px";
    train.style.position = "relative";
    train.style.cursor = "pointer"; // Change cursor to indicate clickability

    // // Add paused flag as a dataset property
    // train.dataset.paused = "false";

    // Attach isMouseDown as a property of the train
    train.isMouseDown = false;

    train.addEventListener("mousedown", function() {
        train.isMouseDown = true;
    });

    train.addEventListener("mouseup", function() {
        train.isMouseDown = false;
    });

    train.addEventListener("mouseleave", function() {
        train.isMouseDown = false;
    });


    // locomotive
    const engine = document.createElement("img");
    engine.src = engineSrc;
    engine.style.height = "95px"

    if(direction === -1){
        train.appendChild(engine);
    }

    // cars
    words.forEach(word => {

        const car = document.createElement("div");
        car.style.position = "relative";

        const img = document.createElement("img");
        img.src = "../icons/train_car.png";
        img.style.height = "85px";
        if (direction === 1 ){
            img.style.height = "100px"
        }

        const label = document.createElement("div");
        label.innerText = word; 
        label.style.position = "absolute";
        label.style.top = "5px"; // Align to the top
        label.style.left = "50%";
        label.style.transform = "translateX(-50%)"; // Only center horizontally
        label.style.fontWeight = "bold";
        label.style.color = "white";
        label.style.fontSize = "18px";

        car.appendChild(img);
        car.appendChild(label);
        train.appendChild(car);

    });

    if(direction === 1){
        train.appendChild(engine);
    }

    const anchor = document.getElementById("train-anchor");
    if(anchor && direction===-1) {
        anchor.after(train); 
    }
    const anchor2 = document.getElementById("train-anchor2");
    if (anchor2 && direction===1) {
        anchor2.after(train);
    }
    moveTrain(train, direction);
}

function moveTrain(train, direction){
    let x = (direction === -1) ? window.innerWidth + 400 : -800;
    let speed = (direction === -1) ? 2 : 1.5; // Top train moves twice as fast


    function animate(){
        if (!train.isMouseDown) {
            x += speed * direction;
            train.style.left = x + "px";
        }

        if(direction === -1 && x < -800){
            x = window.innerWidth + 400;
        }

        if(direction === 1 && x > window.innerWidth + 400){
            x = -800;
        }

        requestAnimationFrame(animate);
    }
    animate();
}


//---------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------Wheeldocument.addEventListener("DOMContentLoaded", function() {
    // Define your questions and answers
document.addEventListener("DOMContentLoaded", function() {
    // Define your questions and answers
    const segments = [
      { text: "Two Strengths", fillStyle: "#3498db" },
      { text: "Two Weaknesses", fillStyle: "#e74c3c" },
      { text: "Question 3", fillStyle: "#3498db" },
      { text: "Question 4", fillStyle: "#e74c3c" },
      { text: "Question 5", fillStyle: "#3498db" },
      { text: "Question 6", fillStyle: "#e74c3c" }
    ];

    const answers = [
      "Answer 1",
      "Answer 2",
      "Answer 3",
      "Answer 4",
      "Answer 5",
      "Answer 6"
    ];

    // Initialize the wheel
    const wheel = new Winwheel({
      'canvasId': 'wheel-of-fortune',
      'numSegments': segments.length,
      'outerRadius': 240,
      'textFontSize': 16,
      'segments': segments,
      'animation': {
        'type': 'spinToStop',
        'duration': 5,
        'spins': 8,
        'callbackFinished': onWheelStop
      }
    });

    wheel.draw();

    // Spin the wheel when the button is clicked
    document.getElementById('spin-button').addEventListener('click', function() {
      wheel.startAnimation();
      this.disabled = true;
    });

    // Handle wheel stop: Show the answer
    function onWheelStop() {
      const winningSegment = wheel.getIndicatedSegment();
      const index = segments.findIndex(segment => segment.text === winningSegment.text);
      document.getElementById('answer-text').textContent = answers[index];
      document.getElementById('answer-popup').style.display = 'block';
      document.getElementById('spin-button').disabled = false;
    }
});
