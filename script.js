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
    } else {
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
    let cartContainer = document.querySelector("#cart")
    cartContainer.innerHTML = ""
    let total = 0

    cart.forEach((item, index) => {
        let itemTotalPrice = (item.price + (item.addOns ? item.addOns.reduce((sum, addOn) => sum + addOn.price, 0) : 0)) * item.quantity
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
                        <p class="itemPrice">$${itemTotalPrice.toFixed(2)}</p>
                        <label for="quantity${index}" id="quantityLabel">Qty</label>
                        <input type="number" id="quantity${index}" name="quantity" class="quantity" value="${item.quantity}" min="1" max="99">
                        <button id="itemEdit" class="btn-signup" onclick="editOpen(event)">Edit</button>
                        <button onclick="removeFromCart(${index})" id="itemRemove" class="btn-signup">Remove</button>
                    </div>
                </div>
            </div>
        </div>`

        cartItem.querySelector(`#quantity${index}`).addEventListener("input", (e) =>{
            let newQuantity = parseInt(e.target.value)
            item.quantity = isNaN(newQuantity) ? 1 : newQuantity
            updateCart()
        })
        cartContainer.appendChild(cartItem)
    })

    document.querySelector("#purchaseContainer h2").textContent = `Total: $${total.toFixed(2)}`
}
function removeFromCart(index){
    let editForm = document.getElementById("editForm")
    let itemName = editForm.getAttribute("data-item-name")
    let menus = [appMenu, soupMenu, saladMenu, entreeMenu, bevMenu]
    let itemData = menus.find(menu => menu.has(itemName))?.get(itemName)

    let checkboxes = editForm.querySelectorAll("input[type='checkbox']")
    checkboxes.forEach((checkbox, index) => {
        itemData.addOns[index].selected = checkbox.checked = false
    })

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
function editOpen(event){
    let itemName = event.target.closest(".item").querySelector("h2").textContent
    let menus = [appMenu, soupMenu, saladMenu, entreeMenu, bevMenu]
    let itemData = menus.find(menu => menu.has(itemName))?.get(itemName)

    let editForm = document.getElementById("editForm")
    editForm.innerHTML = itemData.addOns.map((addOn, index) => `
        <div class="form-section">
            <input type="checkbox" name="addon${index}" id="addon${index}" ${addOn.selected ? "checked" : ""}>
            <label for="addon${index}">${addOn.name} <small>+ $${addOn.price.toFixed(2)}</small></label>
        </div>
    `).join("")

    document.getElementById("editPopup").style.display = "block"
    document.getElementById("editOverlay").style.display = "block"

    editForm.setAttribute("data-item-name", itemName)
}
function editClose(){
    let editForm = document.getElementById("editForm")
    let itemName = editForm.getAttribute("data-item-name")
    let menus = [appMenu, soupMenu, saladMenu, entreeMenu, bevMenu]
    let itemData = menus.find(menu => menu.has(itemName))?.get(itemName)

    let checkboxes = editForm.querySelectorAll("input[type='checkbox']")
    checkboxes.forEach((checkbox, index) => {
        itemData.addOns[index].selected = checkbox.checked
    })

    let cartItem = cart.find(cartItem => cartItem.name === itemName)
    if(cartItem){
        cartItem.addOns = itemData.addOns.filter(addOn => addOn.selected)
        cartItem.totalPrice = cartItem.price + cartItem.addOns.reduce((sum, addOn) => sum + addOn.price, 0)
    }
    updateCart()

    document.getElementById("editPopup").style.display = "none"
    document.getElementById("editOverlay").style.display = "none"
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


// Function for footer subscription
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
    } else{
        cashDiv.style.display = "none"
    }
}
function creditSelect(){
    let creditButton = document.getElementById("credit")
    let creditDiv = document.getElementById("creditDiv")

    if(creditButton.checked){
        creditDiv.style.display = "block"
        cashDiv.style.display = "none"
    } else{
        creditDiv.style.display = "none"
    }
}
function purchase(){
    window.location.href = "receipt.html"
}


// Functions for manager menu
let appMenu = new Map ([
    ["Crab Cakes", {
        price: 14,
        description: "A delicious fishcake made with fresh crab meat. Deep fried to perfection.",
        image: "images/crab-cakes.jpg",
        addOns: [
            {name: "Extra lemon wedge", price: 0.5, selected: false},
            {name: "Extra dipping sauce", price: 1, selected: false},
            {name: "No herbs", price: 0, selected: false}
        ]
    }],
    ["Crispy Calamari", {
        price: 12,
        description: "Lightly breaded tender calamari, paired with a side of marinara sauce.",
        image: "images/crispy-calamari.png",
        addOns: [
            {name: "No chili flakes", price: 0, selected: false},
            {name: "Extra marinara", price: 0.75, selected: false},
            {name: "Lemon wedge", price: 0.5, selected: false}
        ]
    }],
    ["Shrimp Cocktail", {
        price: 16,
        description: "Juicy jumbo shrimp served chilled with a side of bold, spicy cocktail sauce.",
        image: "images/shrimp-cocktail.jpg",
        addOns: [
            {name: "4 extra shrimp", price: 2, selected: false},
            {name: "8 extra shrimp", price: 4, selected: false},
            {name: "Extra lemon", price: 0.5, selected: false},
            {name: "No cocktail sauce", price: 0, selected: false}
        ]
    }],
    ["Oysters Rockefeller (6 Pc.)", {
        price: 18,
        description: "Fresh oysters topped with spinach, breadcrumbs, and Parmesan cheese.",
        image: "images/oysters-rockefeller.png",
        addOns: [
            {name: "Extra spinach", price: 1, selected: false},
            {name: "Substitute breadcrumbs for parmesan", price: 1.5, selected: false},
            {name: "No parmesan", price: 0, selected: false}
        ]
    }],
    ["Fish Tacos", {
        price: 13,
        description: "Flaky fish, fresh slaw, and a zesty lime crema in soft tortillas.",
        image: "images/fish-tacos.jpg",
        addOns: [
            {name: "No cilantro", price: 0, selected: false},
            {name: "Add avocado", price: 1.5, selected: false},
            {name: "Spicy sauce", price: 0.5, selected: false},
            {name: "Mild sauce", price: 0.5, selected: false}
        ]
    }]
])
let soupMenu = new Map ([
    ["New England Clam Chowder", {
        price: 12,
        description: "Comforting chowder with tender clams, potatoes, and a touch of bacon.",
        image: "images/new-england-clam-chowder.jpg",
        addOns: [
            {name: "Extra crackers", price: 0.5, selected: false},
            {name: "Add hot sauce on the side", price: 0.25, selected: false},
            {name: "No bacon", price: 0, selected: false}
        ]
    }],
    ["Seafood Bisque", {
        price: 14,
        description: "Rich, savory bisque blending together delicious lobster, shrimp, and crab.",
        image: "images/seafood-bisque.jpg",
        addOns: [
            {name: "Extra cream", price: 0.75, selected: false},
            {name: "No garlic", price: 0, selected: false},
            {name: "No sherry drizzle", price: 0, selected: false}
        ]
    }]
])
let saladMenu = new Map ([
    ["Pelican's House Salad", {
        price: 8,
        description: "Fresh greens, veggies, and croutons with your choice of dressing.",
        image: "images/house-salad.jpg",
        addOns: [
            {name: "No onions", price: 0, selected: false},
            {name: "Extra croutons", price: 0.5, selected: false},
            {name: "Add avocado", price: 1.5, selected: false}
        ]
    }],
    ["Caesar Salad with Grilled Salmon", {
        price: 16,
        description: "Classic Caesar topped with perfectly grilled salmon.",
        image: "images/grilled-salmon-salad.jpg",
        addOns: [
            {name: "No croutons", price: 0, selected: false},
            {name: "Extra parmesan", price: 0.5, selected: false},
            {name: "Dressing on the side", price: 0, selected: false}
        ]
    }],
    ["Citrus Shrimp Salad", {
        price: 18,
        description: "Shrimp, mixed greens, and mandarin oranges in citrus vinaigrette.",
        image: "images/citrus-shrimp-salad.png",
        addOns: [
            {name: "No citrus dressing", price: 0, selected: false},
            {name: "Add avocado", price: 0.5, selected: false},
            {name: "Substitute grilled chicken for shrimp", price: 2, selected: false}
        ]
    }]
])
let entreeMenu = new Map ([
    ["Blackened Grouper", {
        price: 26,
        description: "Boldly seasoned grouper filet, served with your choice of sides.",
        image: "images/blackened-grouper.jpg",
        addOns: [
            {name: "Make it mild spice", price: 0, selected: false},
            {name: "No blackened seasoning", price: 0, selected: false},
            {name: "Add lemon butter", price: 1, selected: false}
        ]
    }],
    ["Lobster Tail", {
        price: 36,
        description: "Grilled or butter-poached lobster tail, melt-in-your-mouth tender.",
        image: "images/lobster-tail.jpg",
        addOns: [
            {name: "No garlic butter", price: 0, selected: false},
            {name: "Extra lemon", price: 0.5, selected: false},
            {name: "Shell removed", price: 0, selected: false}
        ]
    }],
    ["Pan-seared Scallops", {
        price: 28,
        description: "Golden, caramelized sea scallops perfectly seared with a buttery finish.",
        image: "images/pan-seared-scallops.jpg",
        addOns: [
            {name: "No seasoning", price: 0, selected: false},
            {name: "Extra sear", price: 0.5, selected: false},
            {name: "Side of melted butter", price: 1, selected: false}
        ]
    }],
    ["Shrimp & Grits", {
        price: 22,
        description: "Savory shrimp over creamy, cheesy grits for a Southern-inspired classic.",
        image: "images/shrimp-and-grits.jpg",
        addOns: [
            {name: "No bacon", price: 0, selected: false},
            {name: "Extra cheese in grits", price: 1, selected: false},
            {name: "Swap to mild shrimp", price: 0.5, selected: false}
        ]
    }],
    ["Seafood Paella", {
        price: 30,
        description: "A vibrant mix of seafood and saffron-infused rice.",
        image: "images/seafood-paella.png",
        addOns: [
            {name: "No mussles", price: 0, selected: false},
            {name: "4 extra shrimp", price: 2, selected: false},
            {name: "8 extra shrimp", price: 4, selected: false},
            {name: "Add mild spice", price: 0.5, selected: false}
        ]
    }]
])
let bevMenu = new Map ([
    ["Pelican's Punch", {
        price: 9,
        description: "A tropical blend of rum, pineapple juice, and a splash of grenadine.",
        image: "images/pelicans-punch.jpg",
        addOns: [
            {name: "Less sugar", price: 0, selected: false},
            {name: "Extra fruit garnish", price: 0.75, selected: false}
        ]
    }],
    ["Homemade Lemonade", {
        price: 5,
        description: "Freshly squeezed lemonade with just the right balance of tangy and sweet.",
        image: "images/lemonade.jpg",
        addOns: [
            {name: "Less sugar", price: 0, selected: false},
            {name: "Add mint", price: 0.5, selected: false},
            {name: "Make it sparkling", price: 0.75, selected: false}
        ]
    }],
    ["Citrus Cooler", {
        price: 6,
        description: "A mix of sparkling water, fresh orange and lime juice, and a hint of mint.",
        image: "images/citrus-cooler.jpg",
        addOns: [
            {name: "No lime", price: 0, selected: false},
            {name: "Extra citrus", price: 0.75, selected: false},
            {name: "Add soda water", price: 0.5, selected: false}
        ]
    }],
    ["Frozen Piña Colada", {
        price: 10,
        description: "Coconut and pineapple blended into a tropical delight, with or without rum.",
        image: "images/frozen-pina-colada.jpg",
        addOns: [
            {name: "No whipped cream", price: 0, selected: false},
            {name: "Add a cherry", price: 0.5, selected: false}
        ]
    }],
    ["Margartia", {
        price: 9,
        description: "Tequila and lime, served classic or blended with a salt rim.",
        image: "images/margarita.png",
        addOns: [
            {name: "No salt rim", price: 0, selected: false},
            {name: "Extra lime", price: 0.5, selected: false},
            {name: "Add jalapeño slices", price: 0.75, selected: false}
        ]
    }]
])
function createManagerMenuItems(categoryId, itemsMap) {
    let container = document.getElementById(categoryId);
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
                    <p class="itemPrice">$${item.price.toFixed(2)}</p>
                    <button type="button" class="btn-signup" onclick="removeItem('${name}', '${categoryId}')">Remove</button>
                </div>
            </div>
        `;
        container.appendChild(itemDiv);
    });
}
function createCustomerMenuItems(categoryId, itemsMap) {
    let container = document.getElementById(categoryId);
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
                    <p class="itemPrice">$${item.price.toFixed(2)}</p>
                    <button type="button" id="itemEdit" class="btn-signup" onclick="editOpen(event)">Edit</button>
                    <button type="button" id="itemAdd" class="btn-signup" onclick="addToCart(event)">Add to Cart</button>
                </div>
            </div>
        `;
        container.appendChild(itemDiv);
    });
}
function addItem() {
    let category = prompt("Enter category: ").toLowerCase();
    let name = prompt("Enter item name: ");
    let image = prompt("Enter image url: ");
    let description = prompt("Enter description: ");
    let price = prompt("Enter price (Number Only): ");

    if (category && name && !isNaN(price) && image) {
        let itemString = `${name}|${price}|${description}|${image}`;

        if (category === "appetizers") {
            appMenu.set(name, {price, description, image});
            saveCategoryToStorage("appetizers", appMenu);
            createManagerMenuItems(category, appMenu);
        }
        else if (category === "soups") {
            soupMenu.set(name, {price, description, image});
            saveCategoryToStorage("soups", soupMenu);
            createManagerMenuItems(category, soupMenu);
        }
        else if (category === "salads") {
            saladMenu.set(name, {price, description, image});
            saveCategoryToStorage("salads", saladMenu);
            createManagerMenuItems(category, saladMenu);
        }
        else if (category === "entrees") {
            entreeMenu.set(name, {price, description, image});
            saveCategoryToStorage("entrees", entreeMenu);
            createManagerMenuItems(category, entreeMenu);
        }
        else if (category === "beverages") {
            bevMenu.set(name, {price, description, image});
            saveCategoryToStorage("beverages", bevMenu);
            createManagerMenuItems(category, bevMenu);
        }
        } else {
            alert("Error. Please try again.")
    } 
}
function saveCategoryToStorage(categoryName, menuMap) {
    let menuArray = [];
    menuMap.forEach((value, key) => {
        menuArray.push(`${key}|${value.price}|${value.description}|${value.image}`);
    });
    localStorage.setItem(categoryName, menuArray.join("#"))
}
function removeItem(name, categoryId) {
    let menuMap;
    if (categoryId == "appetizers") menuMap = appMenu;
    else if (categoryId == "soups") menuMap = soupMenu;
    else if (categoryId == "salads") menuMap = saladMenu;
    else if (categoryId == "entrees") menuMap = entreeMenu;
    else if (categoryId == "beverages") menuMap = bevMenu;

    if (menuMap && menuMap.has(name)) {
        menuMap.delete(name);
        saveCategoryToStorage(categoryId, menuMap);
        createManagerMenuItems(categoryId, menuMap);
    }
}
function grabMenuItemsFromStorage(categoryName, menuMap) {
    let storedData = localStorage.getItem(categoryName);
    if (storedData) {
        menuMap.clear();
        storedData.split("#").forEach(item => {
            let [name, price, description, image] = item.split("|");
            menuMap.set(name, {price: parseFloat(price), description, image});
        })
    }
}