
document.getElementById("theQuiz").style.display = "none";
document.addEventListener("DOMContentLoaded", function (){
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
})