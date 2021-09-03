
function toggleNavbar() {
    document.getElementsByClassName("navbar-links")[0].classList.toggle("active");
  }

  let loginButton = document.querySelector(".but1");
let form = document.querySelector(".form");
let RegisterButton = document.querySelector(".but2");
console.log(form);

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
        window.location.href = "./shop.html";
      }
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;

  login(username, password);
});

let RegisterButton = document.querySelector(".but2");
console.log(form);
let form = document.querySelector(".form");

if (regForm != null) {
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let new_user = {
      first_name: document.querySelector("#name").value,
      last_name: document.querySelector("#surname").value,
      email_address: document.querySelector("#email").value,
      // address: document.querySelector(".user5").value,
      username: document.querySelector(".username").value,
      password: document.querySelector("#password").value,
    };

    console.log(new_user);

    fetch("http://127.0.0.1:5000/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // window.location.href = "shop.html";
      });
  });
}

function toggleaddToCart(id) {
  cart.push(id);
    console.log(cart);
  let product = products.find(item => {
  return `.add-${id}`});
  //   console.log(add_btn);
  populateCart();
}

function toggledeleteProduct(index) {
  console.log(index);
  // http://127.0.0.1:5000/delete-product/${index}/
  let delConfirm = confirm("Are you sure you want to delete this product?");
  if (delConfirm) {
    fetch(`http://127.0.0.1:5000/delete-product/${index}/`);
    createCards();
  }
}

function populateCart() {
  fetch("http://127.0.0.1:5000/get-products/").then((request) => {
    request.json().then((obj) => {
      //   console.log(obj);
      data = obj.data;
      let cart_container = document.querySelector(".cart");
      let total_cost = 0;
      //   let total = 0;
      cart_container.innerHTML = ``;
      cart.forEach((order) => {
        // console.log(order);
        data.forEach((product) => {
          if (product[0] == order) {
            // console.log(product);
            total_cost += parseFloat(product[2]);
            cart_container.innerHTML += `<div class="cart-item">
            <p class="id">${product[0]}</p>
            <p class="name">${product[1]}</p>
            <p class="price">${product[2]}</p>
            <p class="quantity">1</p>
          </div>`;
          }
        });
      });
    });
  });
}





Luyanda Aneeqah

Aneenda

Aneeda

luqah

ananda

luyeeqah

aneyanda

luyaneeqah

