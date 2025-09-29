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

function create2DArray(rows, cols) {
    const arr = new Array(Math.floor(rows));
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(Math.floor(cols)).fill(0);
    }
    return arr;
}

//Allows plane object to exist everywhere
const plane = document.createElement('img');
let x,y,screenx, screeny,rotation,next,  myScreen, timer;
let locationx=0, locationy=0;

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

    // Movement
    timer = setInterval(Run, 50);

    //2 dimensional array of the space between start and finish.
    myScreen = create2DArray((window.innerHeight/10), (goalx/10));
   
    //spin logic
    rotation = 0;
    flightPath(x,y,goalx,goaly);

    //variables for current location for fly 
    next = 0;
    function Run() {
        flyAway();
    }
}

//in charge of finding the flight path
function flightPath(x, y, goalx, goaly){
    let pathLength = goalx*1.5;
    let curLength = 0;
    let stepNum = 0, xmove = 0, ymove = 0;
    let posx =0, posy=0;
    while(pathLength > curLength){
        //checks if the plane is within one of the wall , 
        // will have ot add a "fly off  myScreen" clause when I actually do the flight 
        if (Math.abs(y+1) >= window.innerHeight/10 || Math.abs(y-1) >= window.innerHeight/10)
            return  myScreen;
        if (Math.abs(y+1) >= (goalx/10) || Math.abs(y-1) >= (goalx/10))
            return   myScreen;
        
        //finds the biggest distance from cur to wall for either x or y
        let dirMax = (goalx - x) > Math.abs(goaly - y) ? goalx - x: goaly - y;
        if(pathLength - curLength > dirMax){
            while(pathLength > curLength){
                //checks if the plane is within one of the wall
                //had to check a second time due to nested while loops
                if (Math.abs(y+1) >= window.innerHeight/10 || Math.abs(y-1) >= window.innerHeight/10)
                    return   myScreen;
                if (Math.abs(y+1) >= (goalx/10) || Math.abs(y-1) >= (goalx/10))
                    return   myScreen;
                
                //takes you on the straightest path you can to the goal location
                if(y < goaly){
                     myScreen[posx+1][posy+1] = stepNum +1;
                } else if (y > goaly){
                     myScreen[posx+1][posy-1] = stepNum + 1;
                } else {
                     myScreen[posx+1][posy] = stepNum + 1;
                }
                
                //always update these guys, or everything breaks and infinite loops
                stepNum++;
                curLength = stepNum*10;
            }
        }

        // basic movement logic
        xmove = Math.random()*3 - 1;
        ymove = Math.random()*3 - 1;
        posx = posx + xmove;
        posy = posy + ymove;
        if (screen[posx][posy] == 0)
             myScreen[posx][posy] = stepNum;
        curLength = stepNum*10;
    }
    plane.remove();
    clearInterval(timer);
    return  myScreen;
}

//in charge of actually taking the flight path that was found
function flyAway(){
    //lots of spinning logic
    if(Math.random()*30 > 29){
        plane.style.transform = "rotate(10deg)";
        rotation += 10;
    }
    if(rotation != 0){
        plane.style.transform = "rotate(10deg)";
        rotation += 10;
        if((rotation-20)%40== 0 && (rotation < 90||rotation > 270)){
            plane.style.top = (y-10) + "px";
            y = y-10;
        } else if (rotation%40==0 && rotation < 160){
            plane.style.left = (x-10) + "px";
            x = x-10
        } else if ((rotation-20)%40== 0 && (rotation > 90 && rotation < 270)){
            plane.style.top = (y+10) + "px";
            y = y +10;
        }else if(rotation%40==0 && rotation > 160){
            plane.style.left = (x+10)+"px";
            x = x + 10;
        }
        rotation = (rotation == 360)? 0 : rotation;
    } else {
         //actual movement logic
        for(let row = -1; row < 2; row++){
            for(let col = -1; col < 2; col++){
                if (screeny + row >= 0 &&
                    screeny + row <  myScreen.length &&
                    screenx + col >= 0 &&
                    screenx + col <  myScreen[0].length){

                    plane.style.top = y + row*10;
                    plane.style.left = x + col*10;
                    screeny += row;
                    screenx += col;
                     myScreen[screeny + row][screenx + col] = 0;
                }
            }//screeny + (row) >= 0 && screenx + (col) >= 0 &&
            //screenx + (col) <  myScreen[0].length && screeny + (row) <  myScreen.length)
        }
        next++;
    }

   
}

    // document.getElementsByClassName("flip-card-inner")[0].onclick = function(){
    //     this.classList.toggle("active")
    // }
   