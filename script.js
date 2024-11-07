// Functions for signup and login
function signup() {
    let email = document.getElementById("email").value;
    let password =  document.getElementById("password").value;

    if (email === "" || password === ""){
        alert("Please enter a username and password.")
    } else {
        localStorage.setItem(email, password);
        window.location.href = "login.html";
    }
}
function login(){
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    
    if(email === "pelicans.plate@mail.com" && password === "manager"){
        alert("Successful login!")
        location.replace("home.html")
    }
    else{
        if(localStorage.getItem(email)){
            if(password === localStorage.getItem(email)){
                location.replace("home.html")
            }
            else{
                alert("Incorrect password entered. Please try again.")
            }
        }
        else{
            alert("User cannot be found. Please try again.")
        }
    }
}


// FUTURE CODE
