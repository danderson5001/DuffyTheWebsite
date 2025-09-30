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

//Allows plane object to exist everywhere and other globals
const plane = document.createElement('img');
let x,y,screenx, screeny,rotation,next,  myScreen, timer;
let locationx=0, locationy=0;

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

    //2 dimensional array of the space between start and finish.
    myScreen = create2DArray((window.innerHeight/10), (goalx/10));
   
    //spin logic
    rotation = 0;
    flightPath(goalx,goaly);

//test code start
    let str = "";
    for(var i = 0; i < myScreen.length; i++){
        for(var j =0;j<myScreen[0].length;j++){
            if (myScreen[i][j] != 0 ) str += myScreen[i][j] + ", ";
        }
        str += "\n";
    }
    console.log(str +"!");
//test code end
}


//This method sets up the plane and calls the method that actually causes the plane to move
function flight() {
    console.log("plane");
    // Movement
    timer = setInterval(Run, 50);

    //variables for current location for fly 
    next = 0;
    function Run() {
        flyAway();
    }
}

//this method will fill the array 
function flightPath(goalx, goaly){
    let pathLength = goalx*1.5;
    let curLength = 0;
    let stepNum = 0, xmove = 0, ymove = 0;
    let posx = Math.floor(x/10), posy = Math.floor(y/10);

    while(pathLength > curLength){
        stepNum++;

        //checks if the plane is within one of the wall , 
        // will have ot add a "fly off  myScreen" clause when I actually do the flight 
        if (posy < 0 || posy >= window.innerHeight/10) return myScreen;
        if (posx < 0 || posx >= goalx/10) return myScreen;

        // straightest path
        if(y < goaly){
            if (posy+1 < myScreen.length && posx+1 < myScreen[0].length)
                myScreen[posy+1][posx+1] = stepNum;
        } else if (y > goaly){
            if (posy-1 >= 0 && posx+1 < myScreen[0].length)
                myScreen[posy-1][posx+1] = stepNum;
        } else {
            if (posy >= 0 && posx+1 < myScreen[0].length)
                myScreen[posy][posx+1] = stepNum;
        }

        // random wiggle room
        // basic movement logic
        xmove = Math.floor(Math.random()*3 - 1);
        ymove = Math.floor(Math.random()*3 - 1);
        posx = posx + xmove;
        posy = posy + ymove;

        if (posy >= 0 && posy < myScreen.length &&
            posx >= 0 && posx < myScreen[0].length) {
            if (myScreen[posy][posx] == 0)
                myScreen[posy][posx] = stepNum;
        }

        curLength = stepNum*10;
    }
    return myScreen;
}

//in charge of actually taking the flight path that was found
function flyAway(){

    //init vars
    screenx = Math.floor(x / 10);
    screeny = Math.floor(y / 10);

    //lots of spinning logic
    let spinSize = 10;
    if((Math.random()*300) > 299){
        rotation = spinSize;
        plane.style.transform = "rotate("+rotation+"deg)";
    }
    if(rotation != 0){
        rotation += spinSize;
        plane.style.transform = "rotate("+rotation+"deg)";
        if((rotation-20)%40== 0 && (rotation < 90||rotation > 270)){
            plane.style.top = (y-spinSize) + "px";
            y = y-spinSize;
        } else if (rotation%40==0 && rotation < 160){
            plane.style.left = (x-spinSize) + "px";
            x = x-spinSize;
        } else if ((rotation-20)%40== 0 && (rotation > 90 && rotation < 270)){
            plane.style.top = (y+spinSize) + "px";
            y = y +spinSize;
        }else if(rotation%40==0 && rotation > 160){
            plane.style.left = (x+spinSize)+"px";
            x = x + spinSize;
        }
        rotation = (rotation >= 360)? 0 : rotation;
    } else {

         //actual movement logic
         var moveMade = false;
        for(let row = -1; row < 2; row++){
            for(let col = -1; col < 2; col++){
                if (screeny + row >= 0 &&
                    screeny + row <  myScreen.length &&
                    screenx + col >= 0 &&
                    screenx + col <  myScreen[0].length){
                    if (myScreen[screeny + row][screenx + col] != 0){ 
                        y += row*10;
                        x += col*10;
                        plane.style.top = y + "px";
                        plane.style.left = x + "px";
                        screeny += row;
                        screenx += col;
                        myScreen[screeny + row][screenx + col] = 0;
                        moveMade = true;
                        break;
                    }

                }
            }//screeny + (row) >= 0 && screenx + (col) >= 0 &&
            //screenx + (col) <  myScreen[0].length && screeny + (row) <  myScreen.length)
        if (moveMade) break;
        }
        next++;
    }
    if(plane.style.left > window.innerWidth){
        plane.remove();
        clearInterval(timer);
    }
   
}

    // document.getElementsByClassName("flip-card-inner")[0].onclick = function(){
    //     this.classList.toggle("active")
    // }
   