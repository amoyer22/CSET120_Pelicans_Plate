function signup() {
    let email = document.getElementById("email").value;
    let password =  document.getElementById("password").value;

    localStorage.setItem(email, password);
    window.location.href = "login.html";
}