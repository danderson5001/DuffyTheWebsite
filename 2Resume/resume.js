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

//This method sets up the plane and calls the method that actually causes the plane to move
function flight() {
    console.log("plane");

    // Create plane image
    plane.src = '../icons/plane.png';
    plane.id = 'plane';
    plane.style.position = 'absolute';

    let start =  Math.random()*(window.innerHeight);
    let x = 0;
    let y = start;

    plane.style.left = x + 'px';
    plane.style.top = y + 'px';

    // Append to container (make sure planediv exists!)
    planediv.appendChild(plane);

    // Goals
    let goalx = window.innerWidth * 1.1;
    start =  Math.random()*(window.innerHeight);
    let goaly = firstCheck ? start : 0;

    // Movement
    var timer = setInterval(Run, 50);

    //2 dimensional array of the space between start and finish.
    const myScreen = create2DArray((window.innerHeight/10), (goalx/10));
   
    //spin logic
    let rotation = 0;

    myScreen = flightPath(myScreen,x,y,goalx,goaly);

    function Run() {
        flyAway(rotation);
    }
}

//in charge of finding the flight path
function flightPath(screen,  x, y, goalx, goaly){
    let pathLength = goalx*1.5;
    let curLength = 0;
    let stepNum = 0, xmove = 0, ymove = 0;
    while(pathLength > curLength){
        //checks if the plane is within one of the wall , 
        // will have ot add a "fly off screen" clause when I actually do the flight 
        if (Math.abs(y+1) >= window.innerHeight/10 || Math.abs(y-1) >= window.innerHeight/10)
            return screen;
        if (Math.abs(y+1) >= (goalx/10) || Math.abs(y-1) >= (goalx/10))
            return screen;
        
        //finds the biggest distance from cur to wall for either x or y
        let dirMax = (goalx - x) > Math.abs(goaly - y) ? goalx - x: goaly - y;
        if(pathLength - curLength > dirMax){
            while(pathLength > curLength){
                //checks if the plane is within one of the wall
                //had to check a second time due to nested while loops
                if (Math.abs(y+1) >= window.innerHeight/10 || Math.abs(y-1) >= window.innerHeight/10)
                    return screen;
                if (Math.abs(y+1) >= (goalx/10) || Math.abs(y-1) >= (goalx/10))
                    return screen;
                
                //takes you on the straightest path you can to the goal location
                if(y < goaly){
                    screen[x+1,y+1] = stepNum +1;
                } else if (y > goaly){
                    screen[x+1,y-1] = stepNum + 1;
                } else {
                    screen[x+1,y] = stepNum + 1;
                }
                
                //always update these guys, or everything breaks and infinite loops
                stepNum++;
                curLength = stepNum*10;
            }
        }

        // basic movement logic
        xmove = Math.random()*3 - 1;
        ymove = Math.random()*3 - 1;
        x = x + xmove;
        y = y + ymove;
        if (screen[x,y] == 0)
            screen[x,y] = stepNum;
        curLength = stepNum*10;
    }
    plane.remove();
    clearInterval(timer);
    return screen;
}

//in charge of actually taking the flight path that was found
function flyAway(rotation){
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
    }
}

    // document.getElementsByClassName("flip-card-inner")[0].onclick = function(){
    //     this.classList.toggle("active")
    // }
   