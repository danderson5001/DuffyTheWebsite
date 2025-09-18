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

function flight(){
    console.log("plane");
    var timer = setInterval(Run,500);
    let overCheck = false;

    plane =document.createElement('plane')
    plane.src='..icons/plane.png'
    if(firstCheck){
        plane.setAttribute('style','top:'+0+'px;left:'+0+'px')
        var goalx = window.innerWidth*1.1;
        var goaly = window.innerHeight/.8;
    } else {
        plane.setAttribute('style','top:'+window.innerHeight/.8+'px;left:'+0+'px')
        var goalx = window.innerWidth*1.1;
        var goaly = 0;
    }
    planediv.appendChild(img)
    const plane = document.getElementById("plane");
    plane.style.display = "block";
    const imgPlane = imageElement.getBoundingClientRect()

    var ifOne = Math.floor(Math.random()*2);
    var firstCheck = ifOne == 0? true : false;
    
    function Run(){
        let x = imgPlane.left;
        let y = imgPlane.top;
        if(firstCheck){
            if (x < goalx || y < goaly){
                imgPlane.left += 10;
                imgPlane.top += 10;
            } else {
               plane.style.display = "none";
            }
        } else {
             if (x < goalx || y < goaly){
                imgPlane.left += 10;
                imgPlane.top -= 10;
            } else {
               plane.style.display = "none";
            }
        }
    }
}

function scheduleRandomAction() {
  const randomDelay =  Math.floor(Math.random() * (240000 - 20000  + 1)) + 20000 ; //20000 is about 20 seconds and 240000 is about 4 minutes
  setTimeout(() => {
    flight();
    scheduleRandomAction();
  }, randomDelay);
}


    // document.getElementsByClassName("flip-card-inner")[0].onclick = function(){
    //     this.classList.toggle("active")
    // }
   