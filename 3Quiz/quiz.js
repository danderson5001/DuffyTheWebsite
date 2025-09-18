document.addEventListener("DOMContentLoaded", function (){
   main();
})

let output1elem = document.getElementById("output1");
let output2elem = document.getElementById("output2");
let scoreFin = document.getElementById("score");
let score =0;
function main(){
    let submitContinue = true;
    document.getElementById("theQuiz").style.display = "none";
    document.getElementById("postQuiz").style.display = "none";
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
        //and checking if the questions are empty
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
        let str = "";
        qs.forEach(function(q, index) {
            if(q === ""){
                str += (index +1)+", ";
                submitContinue = false;
            }
        });
        if (str != ""){
            let i = "You have left question " + str + " blank. \n Please try again.\n You must answer every question to continue.";
            alert(i);
        }
        

        if(submitContinue){
            document.getElementById("theQuiz").style.display = "none";
            document.getElementById("postQuiz").style.display = "block";
            quizComplete(checkScore(qs, 1));
        }
        
    }
}

//This method is pretty hrd coded and I would love to swap it with a vector database solution soon
function checkScore(qs, attemptNum){
    //This portion should be well annotated, DUFFY!!

    /* 
     Step 1: 20 - 5 * attempts
     Step 2: 1-4 = 15 points each
     Step 3: 5-8 = 5 points each
    */

    // -- 1
    score += 20 - attemptNum * 5;

    //Questions and goal answers

    // "It's a Tuesday, what's the plan?"
    let q1d =["going up", "going hard", "going ham", "brewski", "the boys", "cocktails", "karoake", "swim"];
    // "Describe the perfect spirit animal?"
    let q2d =["hippo", "grinch", "panda", "fluffy", "fangs","power","flames"];
    // "Who is The Onion King?"
    let q3d =["onion", "empire", "best", "magnificent", "emperor", "queen"];
    // "Whats your death row meal?"
    let q4d =["banana", "sourdough"];
    // "What number am I thinking of?"
    let q5d =["1993", "17.5"];
    // "What makes Duffy sad?"
    let q6d =["lies", "pants", "crying babies", "insecurity", "a team"];
    // "What are the two scariest things?"
    let q7d =["cotton balls", "lonliness", "insanity", "heights"];
    // "Name one actor in Duffy's movie?"
    let q8d =["Jim Carey", "Morgan Freeman", "Emma Stone", "Jack Black", "Jenna Ortega"];

    let qsd = [q1d, q2d, q3d, q4d, q5d, q6d, q7d, q8d];
    for(let j = 0;j < qsd.length; j++){
        let qscore = 0
        let qp = (qs[j]).toLowerCase();
        for (let i = 0; i < qsd[j].length; i++){
            if(qp.includes(qsd[j][i])){
                if(j < 4){
                     if(qscore<12){
                        qscore +=6;
                    } else if(qscore < 15){
                        qscore +=1;
                    }//upper 4 score break down, 6,6,1,1,1
                }//checks if it the first four questions or not
                else {
                    if(qscore < 10){
                        if(j == 4){
                            qscore +=10
                        }else{   
                            qscore +=5;
                        }
                    }
                }//post 4 questions
            }//checks if the word occcurs in the goal list 4,4,1,1
        }//Sort through each response
        score += qscore;
    }// sort through which question
    scoreFin.innerHTML = score
    return score;
}

function quizComplete(score, attemptNum){
    let concludingString1 = "You've attempted the quiz " + attemptNum + " times.\n";
    concludingString1 += "You're Score:";
    let concludingString2 = "Which means...\n";
    if(score < 20){
        concludingString2 += "You Failed. EWWWW Loser. Not Duffy at all.";
    } else if (score < 40) {
        concludingString2 += "Yikes, Iguess it could have been worse, but you really need to work on your Duffy.";
    } else if(score < 60){
        concludingString2 += "Not bad, number seems low, but being as cool as Duffy is hard"
    } else if(score < 80){
        concludingString2 += "You and Duffy must be Besties the way you know how the truth";
    } else{
        concludingString2 += "You very well might be Duffy";
    }

    output1elem.innerHTML = concludingString1;
    output2elem.innerHTML = concludingString2;
}