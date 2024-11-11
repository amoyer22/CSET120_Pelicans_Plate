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
                        <button id="itemEdit">Edit</button>
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

    document.querySelector("#purchaseContainer h2").textContent = `Total: $${total}`
}

function removeFromCart(index){
    cart.splice(index, 1)
    updateCart()
}

function placeOrder(){
    window.location.href = "receipt.html";
}