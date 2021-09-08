
function toggleNavbar() {
    document.getElementsByClassName("navbar-links")[0].classList.toggle("active");
  }

  let loginButton = document.querySelector(".but1");
let form = document.querySelector(".form");

function login(username, password) {
  console.log(username);
  console.log(password);
  fetch(" https://bookhub-bookstore.herokuapp.com/auth", {
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
        alert("Login Successful")
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

let RegisterButton = document.querySelector(".but2");
console.log(form);
let regForm = document.querySelector(".reg-form");

if (regForm != null) {
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let new_user = {
      first_name: document.querySelector("#name").value,
      last_name: document.querySelector("#surname").value,
      // email: document.querySelector("#email").value,
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
    };

    console.log(new_user);

    fetch("http://127.0.0.1:5000/registration/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(new_user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Registration Successful")
        window.location.href = "shop.html";
      });
  });
}

function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.querySelector(".container");

  console.log(cart);

  container.innerHTML = "";

  cart.forEach((item) => {
    console.log(item[0]);
  //   let detail = item[0];

    container.innerHTML += `
      <div class="container">
      <h4 class="name">${item.name}</h4>
      <h4 class="price">${item.price}</h4>
      <h4 class="description">${item.description}</h4>
      <button onclick="addToCart">Add to Cart</button>
      <button onclick="removeFromCart(${item.book_id})" class="icons"><i class="far fa-trash-alt">remove</i></button>
      </div>
    `;
  });
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let update = cart.filter((item) => item[0].book_id != id);

  localStorage.setItem("cart", JSON.stringify(update));

  getCart();
  getTotal();
}

getCart();

function getTotal() {
  let total = 0;
  let cart = JSON.parse(localStorage.getItem("cart"));

  cart.forEach(
    // (item) => console.log(item[0].price))
    (item) => (total += parseInt(item[0].price)))
  
  document.querySelector(".total").innerHTML = "Your total is: R" + total;
}


function addToCart(book_id) {
  fetch("https://bookhub-bookstore.herokuapp.com/get-product/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      let books = data.data;

      let book = books.filter((book) => book.book_id == book_id);
      let cart_items = JSON.parse(localStorage.getItem("cart"));
      console.log(book);

      if (cart_items == null) {
        cart_items = [];
      }

      cart_items.push(book);
      localStorage.setItem("cart", JSON.stringify(cart_items));
    });
}


fetch("https://bookhub-bookstore.herokuapp.com/get-product/")
.then((response) => response.json())
.then((data) => {
  console.log(data.data);
  let container = document.querySelector("#container")
  container.innerHTML += `
  <div class="card">
  <div class="name">The Great Gatsby</div>
  <div class="card-details">
    <span class="price">R200</span>
    <span class="description"
      >The Great Gatsby, third novel by F. Scott Fitzgerald, published in 1925 by Charles Scribner's Sons. <br> Set in Jazz Age New York, the novel tells the tragic story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth.</span
    >
    <button class="add" onclick="toggleaddToCart">Add to cart</button>
  </div>
</div>
  `
  console.log(data);});