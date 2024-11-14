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
let items = [
    {
        name: "Crab Cakes",
        price: 14,
        image: "images/crab-cakes.jpg",
        addOns: [
            {name: "Extra lemon wedge", price: 0.50},
            {name: "Extra dipping sauce", price: 1},
            {name: "No herbs", price: 1}
        ]
    },
    {
        name: "Crispy Calamari",
        price: 12,
        image: "images/crispy-calamari.png",
        addOns: [
            {name: "No chili flakes", price: 0},
            {name: "Extra marinara", price: 0.75},
            {name: "Lemon wedge", price: 0.50}
        ]
    },
    {
        name: "Shrimp Cocktail",
        price: 16,
        image: "images/shrimp-cocktail.jpg",
        addOns: [
            {name: "4 extra shrimp", price: 2},
            {name: "8 extra shrimp", price: 4},
            {name: "Extra lemon", price: 0.50},
            {name: "No cocktail sauce", price: 0}
        ]
    },
    {
        name: "Oysters Rockefeller",
        price: 18,
        image: "images/oysters-rockefeller.png",
        addOns: [
            {name: "Extra spinach", price: 1},
            {name: "Substitute breadcrumbs for parmesan", price: 1.50},
            {name: "No parmesan", price: 0}
        ]
    },
    {
        name: "Fish Tacos",
        price: 13,
        image: "images/fish-tacos.jpg",
        addOns: [
            {name: "No cilantro", price: 0},
            {name: "Add avocado", price: 1.50},
            {name: "Spicy sauce", price: 0.50},
            {name: "Mild sauce", price: 0.50}
        ]
    },
    {
        name: "Oysters Rockefeller",
        price: 18,
        image: "images/oysters-rockefeller.png",
        addOns: [
            {name: "Extra spinach", price: 1},
            {name: "Substitute breadcrumbs for parmesan", price: 1.50},
            {name: "No parmesan", price: 0}
        ]
    },
    {
        name: "New England Clam Chowder",
        price: 12,
        image: "images/new-england-clam-chowder.jpg",
        addOns: [
            {name: "Extra crackers", price: 0.50},
            {name: "Add hot sauce on the side", price: 0.25},
            {name: "No bacon", price: 0}
        ]
    },
    {
        name: "Seafood Bisque",
        price: 14,
        image: "images/seafood-bisque.jpg",
        addOns: [
            {name: "Extra cream", price: 0.75},
            {name: "No garlic", price: 0},
            {name: "No sherry drizzle", price: 0}
        ]
    },
    {
        name: "Pelican's House Salad",
        price: 8,
        image: "images/house-salad.jpg",
        addOns: [
            {name: "No onions", price: 0},
            {name: "Extra croutons", price: 0.50},
            {name: "Add avocado", price: 1.50}
        ]
    },
    {
        name: "Caesar Salad with Grilled Salmon",
        price: 16,
        image: "images/grilled-salmon-salad.jpg",
        addOns: [
            {name: "No croutons", price: 0},
            {name: "Extra parmesan", price: 0.50},
            {name: "Dressing on the side", price: 0}
        ]
    },
    {
        name: "Citrus Shrimp Salad",
        price: 18,
        image: "images/citrus-shrimp-salad.png",
        addOns: [
            {name: "No citrus dressing", price: 0},
            {name: "Add avocado", price: 0.50},
            {name: "Substitute grilled chicken for shrimp", price: 2}
        ]
    },
    {
        name: "Blackened Grouper",
        price: 26,
        image: "images/blackened-grouper.jpg",
        addOns: [
            {name: "Make it mild spice", price: 0},
            {name: "No blackened seasoning", price: 0},
            {name: "Add lemon butter", price: 1}
        ]
    },
    {
        name: "Lobster Tail",
        price: 36,
        image: "images/lobster-tail.jpg",
        addOns: [
            {name: "No garlic butter", price: 0},
            {name: "Extra lemon", price: 0.50},
            {name: "Shell removed", price: 0}
        ]
    },
    {
        name: "Pan-seared Scallops",
        price: 28,
        image: "images/pan-seared-scallops.jpg",
        addOns: [
            {name: "No seasoning", price: 0},
            {name: "Extra sear", price: 0.50},
            {name: "Side of melted butter", price: 1}
        ]
    },
    {
        name: "Shrimp and Grits",
        price: 22,
        image: "images/shrimp-and-grits.jpg",
        addOns: [
            {name: "No bacon", price: 0},
            {name: "Extra cheese in grits", price: 1},
            {name: "Swap to mild shrimp", price: 0.50}
        ]
    },
    {
        name: "Seafood Paella",
        price: 30,
        image: "images/seafood-paella.png",
        addOns: [
            {name: "No mussels", price: 0},
            {name: "4 extra shrimp", price: 2},
            {name: "8 extra shrimp", price: 4},
            {name: "Add mild spice", price: 0.50}
        ]
    },
    {
        name: "Pelican's Punch",
        price: 9,
        image: "images/pelicans-punch.jpg",
        addOns: [
            {name: "Less sugar", price: 0},
            {name: "Extra fruit garnish", price: 0.75}
        ]
    },
    {
        name: "Homemade Lemonade",
        price: 5,
        image: "images/lemonade.jpg",
        addOns: [
            {name: "Less sugar", price: 0},
            {name: "Add mint", price: 0.50},
            {name: "Make it sparkling", price: 0.75}
        ]
    },
    {
        name: "Citrus Cooler",
        price: 6,
        image: "images/citrus-cooler.jpg",
        addOns: [
            {name: "No lime", price: 0},
            {name: "Extra citrus", price: 0.75},
            {name: "Add soda water", price: 0.50}
        ]
    },
    {
        name: "Frozen Piña Colada",
        price: 10,
        image: "images/frozen-pina-colada.jpg",
        addOns: [
            {name: "No whipped cream", price: 0},
            {name: "Add a cherry", price: 0.50}
        ]
    }, 
    {
        name: "Margarita",
        price: 9,
        image: "images/margarita.png",
        addOns: [
            {name: "No salt rim", price: 0},
            {name: "Extra lime", price: 0.50},
            {name: "Add jalapeño slices", price: 0.75}
        ]
    }
]

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
