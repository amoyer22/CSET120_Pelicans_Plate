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
    
    if (email === "pelicans.plate@mail.com" && password === "manager"){
        alert("Successful login!")
        location.replace("home.html")   
    } else {
        if(localStorage.getItem(email)){
            if(password === localStorage.getItem(email)){
                location.replace("home.html")
            } else {
                alert("Incorrect password entered. Please try again.")
            }
        } else {
            alert("User cannot be found. Please try again.")
        }
    }
}

//Functions for receipt functionality
let orderNumber = document.getElementById("order-number");
let timeEstimate = document.getElementById("time-estimate");


function orderNumGenerator() {
    let orderNum = "Order Number: " + Math.floor(Math.random() * 99) + 1;
    orderNumber.innerHTML = orderNum;
}
function timeGeneration() {
    let cartItems = document.querySelector("#cart-items");
    let childElements = cartItems.children;
    let cartArray = Array.from(childElements);
    let time = "";
    console.log(cartArray.length);
    if (cartArray.length >= 4) {
        time = 45 + " minutes.";
    } else if (cartArray.length >= 8) {
        time = 1 + " hour.";
    } else {
        time = 35 + " minutes.";
    }
    let timeEst = "Your order will be ready in " + time;
    timeEstimate.innerHTML = timeEst;
}

orderNumGenerator();
timeGeneration();