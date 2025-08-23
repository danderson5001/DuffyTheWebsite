document.addEventListener("DOMContentLoaded", function (){
   main();
})

function main(){
     document.getElementById("theQuiz").style.display = "none";
    document.getElementById("loginBtn").onclick = () => {
        let username = document.getElementById("user").value;
        let password = document.getElementById("pass").value;
        if (!username) username = "";
        if (!password) password = "";
        if ((username && password)&&(username.trim().length > 0) && (password.trim().length > 0)){
            document.getElementById("userInfo").style.display = "none";
            document.getElementById("theQuiz").style.display = "block";
        }
    };

    /*** 1.tuesday 2.spiritAnimal 3.TheOnionKing 4.deathRow 5.number 6.sad 7.scary 8.actor*/
    document.getElementById("submitQuiz").onclick = () => {
        //pulling the user responses
        let q1 = document.getElementById("q1") ? document.getElementById("q1").value : "";
        let q2 = document.getElementById("q2") ? document.getElementById("q2").value : "";
        let q3 = document.getElementById("q3") ? document.getElementById("q3").value : "";
        let q4 = document.getElementById("q4") ? document.getElementById("q4").value : "";
        let q5 = document.getElementById("q5") ? document.getElementById("q5").value : "";
        let q6 = document.getElementById("q6") ? document.getElementById("q6").value : "";
        let q7 = document.getElementById("q7") ? document.getElementById("q7").value : "";
        let q8 = document.getElementById("q8") ? document.getElementById("q8").value : "";
        //creating the duffy response arrays
        let qs = [q1,q2,q3,q4,q5,q6,q7,q8]
        qs.forEach(function(q, index) {
            if(q === ""){
                let i = "You have left question " + (index + 1) + " blank. \n Please try again."
                alert(i);
                let submitContinue = false;
            }
        });

        if(submitContinue){
            checkScore(qs, 1);
        }
        let dq1 =["going up", "going hard", "going ham", "brewski", "the boys", "cocktails", "karoake", "swim"];
        let dq2 =["hippo", "grinch", "panda", "fluffy", "","power"];
    }
}

function checkScore(qs, attemptNum){
    //This portion should be well annotated, DUFFY!!

    let score = 0;

    /* 
     Step 1: 20 - 5 * attempts
     Step 2: 1-4 = 15 points each
     Step 3: 5-8 = 5 points each
    */

    score += 20 - attemptNum * 5;

    // zero indexed, so this is for question one
    let q1 = qs[0];

}