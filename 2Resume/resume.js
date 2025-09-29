document.addEventListener("DOMContentLoaded", function (){
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
})



//Flight Stuff below here ------------------------------------------------------------------------------------------------------------

//Allows plane object to exist everywhere
const plane = document.createElement('img');

function scheduleRandomAction() {
     //20000 is about 20 seconds and 240000 is about 4 minutes
  const randomDelay =  2000;//Math.floor(Math.random() * (240000 - 20000  + 1)) + 20000 ; 
  setTimeout(() => {
    flight();
    scheduleRandomAction();
  }, randomDelay);
}

function flight() {
    console.log("plane");

    // Random direction check FIRST
    var ifOne = Math.floor(Math.random() * 2);
    var firstCheck = ifOne === 0;

    // Create plane image
    plane.src = '../icons/plane.png';
    plane.id = 'plane';
    plane.style.position = 'absolute';

    // Starting position
    let x = 0;
    let y = 0;

    if (firstCheck) {
        x = 0;
        y = 0;
    } else {
        x = 0;
        y = window.innerHeight / 0.8; // careful: "/.8" = *larger than screen*
        plane.style.transform = "rotate(330deg)"
    }

    plane.style.left = x + 'px';
    plane.style.top = y + 'px';

    // Append to container (make sure planediv exists!)
    planediv.appendChild(plane);

    // Goals
    let goalx = window.innerWidth * 1.1;
    let goaly = firstCheck ? window.innerHeight / 0.8 : 0;

    // Movement
    var timer = setInterval(Run, 50);

    //2 dimensional array of the space between start and finish.
    const myScreen = create2DArray((window.innerHeight / 0.8), goalx);
   
    //spin logic
    let rotation = 0;

    function Run() {
        //spin logic
        if(rotation != 0){
            plane.style.transform = "rotate(10deg)";
            rotation += 10;
            rotation = (rotation == 360)? 0 : rotation;
        } else {
            if(Math.random()*30 > 29){
                plane.style.transform = "rotate(10deg)";
                rotation += 10;
            }

            //calls to actual movement logic.
            if (firstCheck) {
                upDown(myScreen, x, y, goalx, goaly);
            } else {
                downUp(myScreen, x, y, goalx, goaly)
                
            }
        }    
    }
}

function upDown(screen,  x, y, goalx, goaly){
        
}

function downUp(){

}

    // document.getElementsByClassName("flip-card-inner")[0].onclick = function(){
    //     this.classList.toggle("active")
    // }
   