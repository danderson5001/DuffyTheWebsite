document.addEventListener("DOMContentLoaded", function (){
    Array.from(document.getElementsByClassName("flip-card-inner")).forEach(element => {
        element.onclick = function(){
            this.classList.toggle("active")
        }
    });
    // for each later for each one in the list and then they dont all need different names
})



    // document.getElementsByClassName("flip-card-inner")[0].onclick = function(){
    //     this.classList.toggle("active")
    // }
   