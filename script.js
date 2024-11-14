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
        location.replace("manager.html")
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
function addToCart(event){
    let itemEle = event.target.closest(".item")
    let itemName = itemEle.querySelector("h2").textContent
    let itemPrice = parseFloat(itemEle.querySelector(".itemPrice").textContent.replace("$", ""))
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
        <div class="itemContainer">
            <div class="item">
                <div class="itemImage">
                    <img src="${item.image}" width="45px" alt="${item.name}">
                </div>
                <div class="itemDescription">
                    <h2>${item.name}</h2>
                    <div class="itemInfo">
                        <p class="itemPrice">$${itemTotalPrice}</p>
                        <label for="quantity" id="quantityLabel">Qty</label>
                        <input type="number" id="quantity" name="quantity" value="${item.quantity}" placeholder="1" min="1" max="99">
                        <button id="itemEdit" onclick="editOpen()">Edit</button>
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


// Function for payment option section */
function nameSave() {
    let customerNameElement = document.getElementById("orderName");
    let customerName = customerNameElement.value;
    localStorage.setItem("customerName", customerName);
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
function nameOnOrder() {
    let name = localStorage.getItem("customerName");
    let customerName = "Order Name: " + name;
    orderName.innerHTML = customerName;
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
    localStorage.removeItem("customerName");
    window.location.href = "menu.html";
}


// Script for mobile nav
let mobileNav = document.querySelector(".hamburger");
let navList = document.querySelector(".mobile-nav-list");
let header = document.querySelector("header");

mobileNav.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    navList.classList.toggle("active");
})


// Script for footer subscription
function subscribe() {
    let subscriptionbox = document.getElementById("subscribe");
    if (subscriptionbox.value == "") {
        alert("Please enter an email if you wish to subscribe.");
    } else {
        alert("You have now signed up for email notifications. Thank you!");
        subscriptionbox.value = ""; 
    }
}


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


// Functions for manager menu
let appMenu = new Map ([
    ["Crab Cakes", {price: 14, description: "A delicious fishcake made with fresh crab meat. Deep fried to perfection.", image: "images/crab-cakes.jpg"}],
    ["Crispy Calamari", {price: 12, description: "", image: "images/crispy-calamari.png"}],
    ["Shrimp Cocktail", {price: 16, description: "", image: "images/shrimp-cocktail.jpg"}],
    ["Oysters Rockefeller (6 Pc.)", {price: 18, description: "", image: "images/oysters-rockefeller.png"}],
    ["Fish Tacos", {price: 13, description: "", image: "images/fish-tacos.jpg"}]
])
let soupMenu = new Map ([
    ["New England Clam Chowder", {price: 12, description: "", image: "images/new-england-clam-chowder.jpg"}],
    ["Seafood Bisque", {price: 14, description: "", image: "images/seafood-bisque.jpg"}]
])
let saladMenu = new Map ([
    ["Pelican's House Salad", {price: 8, description: "", image: "images/house-salad.jpg"}],
    ["Caesar Salad with Grilled Salmon", {price: 16, description: "", image: "images/grilled-salmon-salad.jpg"}],
    ["Citrus Shrimp Salad", {price: 18, description: "", image: "images/citrus-shrimp-salad.png"}]
])
let entreeMenu = new Map ([
    ["Blackened Grouper", {price: 26, description: "", image: "images/blackened-grouper.jpg"}],
    ["Lobster Tail", {price: 36, description: "", image: "images/lobster-tail.jpg"}],
    ["Pan-seared Scallops", {price: 28, description: "", image: "images/pan-seared-scallops.jpg"}],
    ["Shrimp & Grits", {price: 22, description: "", image: "images/shrimp-and-grits.jpg"}],
    ["Seafood Paella", {price: 30, description: "", image: "images/seafood-paella.png"}]
])
let bevMenu = new Map ([
    ["Pelican's Punch", {price: 9, description: "", image: "images/pelicans-punch.jpg"}],
    ["Homemade Lemonade", {price: 5, description: "", image: "images/lemonade.jpg"}],
    ["Citrus Cooler", {price: 6, description: "", image: "images/citrus-cooler.jpg"}],
    ["Frozen Piña Colada", {price: 10, description: "", image: "images/frozen-pina-colada.jpg"}],
    ["Margartia", {price: 9, description: "", image: "images/margarita.png"}]
])

function createManagerMenuItems(catagoryId, itemsMap) {
    let container = document.getElementById(catagoryId);
    container.innerHTML = "";
    itemsMap.forEach((item, name) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemDiv.innerHTML = `
            <div class="itemImage">
                <img src="${item.image}" style="max-width: 100px;" alt="${name}">
            </div>
            <div class="itemDescription">
                <h2>${name}</h2>
                <p>${item.description}</p>
                <div class="itemInfo">
                    <p class="itemPrice">$${item.price}</p>
                    <button type="button" class="btn-signup" onclick="removeItem('${name}', '${catagoryId}')">Remove</button>
                </div>
            </div>
        `;
        container.appendChild(itemDiv);
    });
}
function createCustomerMenuItems(catagoryId, itemsMap) {
    let container = document.getElementById(catagoryId);
    container.innerHTML = "";
    itemsMap.forEach((item, name) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemDiv.innerHTML = `
            <div class="itemImage">
                <img src="${item.image}" style="max-width: 100px;" alt="${name}">
            </div>
            <div class="itemDescription">
                <h2>${name}</h2>
                <p>${item.description}</p>
                <div class="itemInfo">
                    <p class="itemPrice">$${item.price}</p>
                    <button id="itemEdit" onclick="editOpen()">Edit</button>
                    <button id="itemAdd" onclick="addToCart(event)">Add to Cart</button>
                </div>
            </div>
        `;
        container.appendChild(itemDiv);
    });
}
function addItem() {
    let catagory = prompt("Enter catagory: ").toLowerCase();
    let name = prompt("Enter item name: ");
    let image = prompt("Enter image url: ");
    let description = prompt("Enter description: ");
    let price = prompt("Enter price (Number Only): ");

    if (catagory && name && !isNaN(price) && image && catagory == "appetizers") {
        appMenu.set(name, {price, description, image});
        createManagerMenuItems(catagory, appMenu);
    } 
    else if (catagory && name && !isNaN(price) && image && catagory == "soups") {
        soupMenu.set(name, {price, description, image});
        createManagerMenuItems(catagory, soupMenu);
    }
    else if (catagory && name && !isNaN(price) && image && catagory == "salads") {
        saladMenu.set(name, {price, description, image});
        createManagerMenuItems(catagory, saladMenu);
    }
    else if (catagory && name && !isNaN(price) && image && catagory == "entrees") {
        entreeMenu.set(name, {price, description, image});
        createManagerMenuItems(catagory, entreeMenu);
    }
    else if (catagory && name && !isNaN(price) && image && catagory == "beverages") {
        bevMenu.set(name, {price, description, image});
        createManagerMenuItems(catagory, bevMenu);
    } else {
        alert("Error. Please try again.")
    }
}
function removeItem(name, catagoryId) {
    if (appMenu.has(name)) {
        appMenu.delete(name);
        createManagerMenuItems(catagoryId, appMenu);
    }
    else if (soupMenu.has(name)) {
        soupMenu.delete(name);
        createManagerMenuItems(catagoryId, soupMenu);
    }
    else if (saladMenu.has(name)) {
        saladMenu.delete(name);
        createManagerMenuItems(catagoryId, saladMenu);
    }
    else if (entreeMenu.has(name)) {
        entreeMenu.delete(name);
        createManagerMenuItems(catagoryId, entreeMenu);
    }
    else if (bevMenu.has(name)) {
        bevMenu.delete(name);
        createManagerMenuItems(catagoryId, bevMenu);
    }
}