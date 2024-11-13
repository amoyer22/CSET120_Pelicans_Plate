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


// Functions for cart
let cart = []
let items = new Map([
    ["Crab Cakes", 14],
    ["Crispy Calamari", 12],
    ["Shrimp Cocktail", 16],
    ["Oysters Rockefeller", 18],
    ["Fish Tacos", 13],
    ["New England Clam Chowder", 12],
    ["Seafood Bisque", 14],
    ["Pelicans House Salad", 8],
    ["Ceasar Salad with Grilled Salmon", 16],
    ["Citrus Shrimp Salad", 18],
    ["Blackened Grouper", 26],
    ["Lobster Tail", 36],
    ["Pan seared Scallops", 28],
    ["Shrimp and Grits", 22],
    ["Seafood Paella", 30],
    ["Pelicans Punch", 9],
    ["Homemade Lemonade", 5],
    ["Citrus Cooler", 6],
    ["Frozen Pina Colada", 10],
    ["Margarita", 9]
])
function addToCart(event){
    let itemEle = event.target.closest("#item")
    let itemName = itemEle.querySelector("h2").textContent
    let itemPrice = parseFloat(itemEle.querySelector("#itemPrice").textContent.replace("$", ""))
    let itemImage = itemEle.querySelector("img").src

    let existingItem = cart.find(cartItem => cartItem.name === itemName)

    if(existingItem){
        alert("This item is already in your cart!")
    }
    else{
        let item = {
            name: itemName,
            price: itemPrice,
            image: itemImage,
            quantity: 1
        }
        cart.push(item)
        updateCart()
    }
}
function updateCart(){
    console.log(cart)
    let cartContainer = document.querySelector("#cart")
    cartContainer.innerHTML = ""
    let total = 0

    cart.forEach((item, index) => {
        let itemTotalPrice = item.price * item.quantity
        total += itemTotalPrice

        let cartItem = document.createElement("div")
        cartItem.classList.add("cart-item")
        cartItem.innerHTML = `
        <div id="itemContainer">
            <div id="item">
                <div id="itemImage">
                    <img src="${item.image}" width="45px" alt="${item.name}">
                </div>
                <div id="itemDescription">
                    <h2>${item.name}</h2>
                    <div id="itemInfo">
                        <p id="itemPrice">$${itemTotalPrice}</p>
                        <label for="quantity" id="quantityLabel">Qty</label>
                        <input type="number" id="quantity" name="quantity" value="${item.quantity}" placeholder="1" min="1" max="99">
                        <button id="itemEdit" onclick="editItem()">Edit</button>
                        <button onclick="removeFromCart(${index})" id="itemRemove">Remove</button>
                    </div>
                </div>
            </div>
        </div>`

        cartItem.querySelector("#quantity").addEventListener("input", (e) =>{
            let newQuantity = parseInt(e.target.value)
            item.quantity = isNaN(newQuantity) ? 1 : newQuantity
            updateCart()
        })
        cartContainer.appendChild(cartItem)
    })
    document.querySelector("#purchaseContainer h2").textContent = `Total: $${total}`;
}
function removeFromCart(index){
    cart.splice(index, 1)
    updateCart()
}
function checkout(){
    if(cart.length === 0){
        alert("You have no items in your cart!")
    } else {
        cart.forEach((item, index) => {
            localStorage.setItem(`cartItem${index}`, `${item.name}|${item.price}|${item.quantity}`);
        });
        let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        localStorage.setItem("cartTotal", total);
        window.location.href = "checkout.html"
    }
}
function clearLocalStorage() {
    let index = 0
    while (localStorage.getItem(`cartItem${index}`)) {
        localStorage.removeItem(`cartItem${index}`);
        index++;
    }
    localStorage.removeItem("cartTotal");
}
function editOpen(){
    document.getElementById("editPopup").style.display = "block";
    document.getElementById("editOverlay").style.display = "block";
}
function editClose(){
    document.getElementById("editPopup").style.display = "none";
    document.getElementById("editOverlay").style.display = "none";
}


//Functions for receipt functionality
let orderNumber = document.getElementById("order-number");
let timeEstimate = document.getElementById("time-estimate");
let receiptTotalCost = document.getElementById("total");
let orderName = document.getElementById("customer-name");

function orderNumGenerator() {
    let orderNum = "Order Number: " + (Math.floor(Math.random() * 899) + 100);
    orderNumber.innerHTML = orderNum;
}

function updateReceipt() {
    let ItemsContainer = document.querySelector("#receipt-table tbody");
    let index = 0;

    while(localStorage.getItem(`cartItem${index}`)) {
        let [name, price, quantity] = localStorage.getItem(`cartItem${index}`).split("|");
        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="item-name">${name}</td>
            <td class="item-quantity">${quantity}</td>
            <td class="item-price">$${(parseFloat(price) * parseInt(quantity)).toFixed(2)}</td>
        `;
        ItemsContainer.appendChild(row);
        index++;
    }
}
function receiptTotal() {
    let total = localStorage.getItem("cartTotal");    
    if (total) {
        receiptTotalCost.innerHTML = "Total: $" + total;
    } else {
        receiptTotalCost.innerHTML = "Total: $" + 0;
    }
}
function timeGeneration() {
    let cartItems = document.querySelector("#cart-items");
    let childElements = cartItems.children;
    let cartArray = Array.from(childElements);
    let time = "";
    console.log(cartArray.length);
    if (cartArray.length >= 4) {
        time = 45 + " minutes.";
    } 
    else if (cartArray.length >= 8) {
        time = 1 + " hour.";
    } else {
        time = 35 + " minutes.";
    }
    let timeEst = "Your order will be ready in " + time;
    timeEstimate.innerHTML = timeEst;
}
function clearReceipt() {
    let index = 0
    while (localStorage.getItem(`cartItem${index}`)) {
        localStorage.removeItem(`cartItem${index}`);
        index++;
    }
    localStorage.removeItem("cartTotal");
    window.location.href = "menu.html";
}


// Functions for mobile nav
let mobileNav = document.querySelector(".hamburger");
let navList = document.querySelector(".mobile-nav-list");
let header = document.querySelector("header");

mobileNav.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    navList.classList.toggle("active");
})


// Functions for checkout page
function cashSelect(){
    let cashButton = document.getElementById("cash")
    let cashDiv = document.getElementById("cashDiv")

    if(cashButton.checked){
        cashDiv.style.display = "block"
        creditDiv.style.display = "none"
    }
    else{
        cashDiv.style.display = "none"
    }
}
function creditSelect(){
    let creditButton = document.getElementById("credit")
    let creditDiv = document.getElementById("creditDiv")

    if(creditButton.checked){
        creditDiv.style.display = "block"
        cashDiv.style.display = "none"
    }
    else{
        creditDiv.style.display = "none"
    }
}
function purchase(){
    window.location.href = "receipt.html"
}
