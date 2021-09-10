// Greetings
const user = JSON.parse(localStorage.getItem("user"));
if (user != null) {
  document.querySelector("#greet").innerHTML = `${user.name}`;
}

// NavBar
function toggleNavbar() {
  document.getElementsByClassName("navbar-links")[0].classList.toggle("active");
}
// Buttons
let loginButton = document.querySelector(".but1");
let form = document.querySelector(".form");

// Login
function login(username, password) {
  console.log(username);
  console.log(password);
  fetch("https://bookhub-bookstore.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["access_token"]) {
        console.log(data);
        myStorage = window.localStorage;
        myStorage.setItem("jwt-token", data["access_token"]);
        myStorage.setItem("username", username);
        myStorage.setItem("password", password);
        alert("Login Successful");
        window.location.href = "./shop.html";
      }
    });
}
if (form != null) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = document.querySelector(".username").value;
    let password = document.querySelector(".password").value;

    login(username, password);
  });
}

// Admin Login
function adminlogin(username, password) {
  console.log(username);
  console.log(password);
  fetch("https://bookhub-bookstore.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["access_token"]) {
        console.log(data);
        myStorage = window.localStorage;
        myStorage.setItem("jwt-token", data["access_token"]);
        myStorage.setItem("username", username);
        myStorage.setItem("password", password);
        alert("Login Successful");
        window.location.href = "./adminshop.html";
      }
    });
}
if (form != null) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = document.querySelector(".username").value;
    let password = document.querySelector(".password").value;

    adminlogin(username, password);
  });
}

// Registration
let RegisterButton = document.querySelector(".but2");
console.log(form);
let regForm = document.querySelector(".reg-form");

if (regForm != null) {
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let new_user = {
      first_name: document.querySelector("#name").value,
      last_name: document.querySelector("#surname").value,
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
    };

    console.log(new_user);

    fetch("https://bookhub-bookstore.herokuapp.com/registration/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(new_user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Registration Successful");
        window.location.href = "shop.html";
      });
  });
}

// Get Cart
function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.querySelector(".container1");
  console.log(container);

  console.log(cart);

  container.innerHTML = "";

  cart.forEach((item) => {
    console.log(item);
    //   let detail = item[0];

    container.innerHTML += `
      <div class="container">
      <h4 class="name">${item[1]}</h4>
      <h4 class="price">${item[2]}</h4>
      <button>Delete</button>
      </div>
    `;
  });
}

// Remove from Cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let update = cart.filter((item) => item[0].book_id != id);

  localStorage.setItem("cart", JSON.stringify(update));

  // getCart();
  getTotal();
}

// getCart();

function getTotal() {
  let total = 0;
  let cart = JSON.parse(localStorage.getItem("cart"));

  cart.forEach(
    // (item) => console.log(item[0].price))
    (item) => (total += parseInt(item[0].price))
  );

  document.querySelector(".total").innerHTML = "Your total is: R" + total;
}

// Add to Cart
function addToCart(book_id) {
  fetch("https://bookhub-bookstore.herokuapp.com/get-product/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      let books = data.data;

      let book = books.filter((book) => book[0] == book_id);
      let cart_items = JSON.parse(localStorage.getItem("cart")) || [];
      console.log(book);

      if (cart_items == null) {
        cart_items = [];
      }

      cart_items.push(book[0]);
      localStorage.setItem("cart", JSON.stringify(cart_items));
    });
}

// Fetching Products
fetch("https://bookhub-bookstore.herokuapp.com/get-product/")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.data);
    let products = data.data;
    console.log(products);
    let container = document.querySelector("#container");
    products.forEach((product) => {
      container.innerHTML += `
  <div class="container1">
    <div class="card">
  <img src="./neb.jpg" alt="" />
  <div class="name">${product[1]}</div>
  <div class="card-details">
    <p class="price">${product[2]}</p>   
    <p class="description">${product[3]}</p>  
      <button class="add" onclick="addToCart(${product[0]})">Add to cart</button>
  </div>
</div>
</div>
  `;
    });
  });

// Admin Products
fetch("https://bookhub-bookstore.herokuapp.com/get-product/")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.data);
    let products = data.data;
    console.log(products);
    let container = document.querySelector(".container1");
    products.forEach((product) => {
      container.innerHTML += `
  <div class="container1">
    <div class="card">
  <img src="./neb.jpg" alt="" />
  <div class="name">${product[1]}</div>
  <div class="card-details">
    <p class="price">${product[2]}</p>
    <p class="description">${product[3]}</p>
      <button class="delete" onclick="toggledelete">Delete</button>
      <button class="edit" onclick="toggleedit">Edit</button>
      
  </div>
</div>
</div>
  `;
    });
  });

// Delete

function toggledelete(index) {
  console.log(index);
  // http://127.0.0.1:5000/delete-product/${index}/
  let delConfirm = confirm("Are you sure you want to delete this product?");
  if (delConfirm) {
    fetch(`https://bookhub-bookstore.herokuapp.com/delete-product/${index}/`);
    createCards();
  }
}

let item_container = document.querySelector(".card");
