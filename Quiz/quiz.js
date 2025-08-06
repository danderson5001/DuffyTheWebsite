document.addEventListener("DOMContentLoaded", function (){
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
        let dq1 =["going up", "going hard", "going ham", "brewski", "the boys", "cocktails", "karoake", "swim"];
        let dq2 =["hippo", "grinch", "panda", "fluffy", "","power"];
    }
})