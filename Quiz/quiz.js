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

    // -- 1
    score += 20 - attemptNum * 5;

    //Questions and goal answers

    // "It's a Tuesday, what's the plan?"
    let q1d =["going up", "going hard", "going ham", "brewski", "the boys", "cocktails", "karoake", "swim"];
    
    // "Describe the perfect spirit animal?"
    let q2d =["hippo", "grinch", "panda", "fluffy", "fangs","power","flames"];
    
    // "Who is The Onion King?"
    let q3d =["onion", ""];
    // "Whats your death row meal?"
    let q4d =[];
    // "What number am I thinking of?"
    let q5d =[];
    // "What makes Duffy sad?"
    let q6d =[];
    // "What are the two scariest things?"
    let q7d =[];
    // "Name one actor in a movie about Duffy's life?"
    let q8d =[];

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
                    if(qscore < 8){
                        qscore +=8;
                    }
                    else if(qscore<10) {
                        qscore += 1;
                    }
                }//post 4 questions
            }//checks if the word occcurs in the goal list
        }//Sort through each response
        score += q1score;
    }// sort through which question

    // -- 2
    /* 
        zero indexed, so this is for question one
        
        qp = question player will be overwritten with each question
        q1d = question 1 Duffy
    */
    

    /*

    */





}