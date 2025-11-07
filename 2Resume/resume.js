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

//Allows plane object to exist everywhere and other globals
const plane = document.createElement('img');
let x,y,screenx, screeny,rotation, myScreen, timer;
let locationx=0, locationy=0;
const points = new Array[2][6];


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
   
    //spin logic
    rotation = 0;

    /*
        Assigns the path the plane will take by creating 
        6 random points acrross the screeen it must hit 
    **/
    var sixth = window.innerWidth/6;
    count = 0;
    var j = 0;
    for(var i = 0; count == 5;){
        i += Math.random * sixth;
        j  = Math.random * window.innerWidth;
        points[count][0] = i;
        points[count][1] = j;
        count ++;
    }

//test code start
    // let str = "";
    // for(var i = 0; i < myScreen.length; i++){
    //     for(var j =0;j<myScreen[0].length;j++){
    //         if (myScreen[i][j] != 0 ) str += myScreen[i][j] + ", ";
    //     }
    //     str += "\n";
    // }
    // console.log(str +"!");
//test code end
}


//This method sets up the plane and calls the method that actually causes the plane to move
function flight() {
    console.log("plane");
    // Movement
    timer = setInterval(Run, 50);

    //variables for current location for fly 
    function Run() {
        flyAway();
    }
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

        // //actual movement logic
        // var moveMade = false;
        // for(let row = -1; row < 2; row++){
        //     for(let col = -1; col < 2; col++){
        //         if (screeny + row >= 0 &&
        //             screeny + row <  myScreen.length &&
        //             screenx + col >= 0 &&
        //             screenx + col <  myScreen[0].length){
        //             if (myScreen[screeny + row][screenx + col] != 0){ 
        //                 y += row*10;
        //                 x += col*10;
        //                 plane.style.top = y + "px";
        //                 plane.style.left = x + "px";
        //                 screeny += row;
        //                 screenx += col;
        //                 myScreen[screeny][screenx] = 0;
        //                 moveMade = true;
        //                 break;
        //             }

        //         }
        //     }//screeny + (row) >= 0 && screenx + (col) >= 0 &&
        //     //screenx + (col) <  myScreen[0].length && screeny + (row) <  myScreen.length)
        // if (moveMade) break;
        // }
        // next++;
    }
    if(x > window.innerWidth + 5){
        plane.remove();
        clearInterval(timer);
    }
   
}

    // document.getElementsByClassName("flip-card-inner")[0].onclick = function(){
    //     this.classList.toggle("active")
    // }
   