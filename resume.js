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
   