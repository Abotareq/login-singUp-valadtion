var nameSingup = document.querySelector("#nameSingupInput");
var emailSingup = document.querySelector("#emailSingupInput");
var passSingup = document.querySelector("#passSingupInput");
var singupBtn = document.querySelector("#singup");
var users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];
var alretExsist = document.querySelector(".exsist");
var success = document.querySelector(".success");
var emailLogin = document.querySelector("#emailLoginInput");
var passLogin = document.querySelector("#passLoginInput");
var loginBtn = document.querySelector("#login");
var alretLogin = document.querySelector(".alretLogin");
var welcomeUser = document.getElementById("userName");
var userindex;
var logoutBtn = document.getElementById("logoutBtn");
logoutBtn != null
  ? logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("currentUser");
    })
  : null;
singupBtn != null
  ? singupBtn.addEventListener("click", function (e) {
      e.preventDefault();

      saveInfo();
    })
  : null;
function saveInfo() {
  var temp = {
    name: nameSingup.value,
    email: emailSingup.value,
    pass: passSingup.value,
  };
  console.log(users);
  if (check(temp) == 0) {
    users.push(temp);
    deleteSingup();
    localStorage.setItem("users", JSON.stringify(users));
    success.classList.replace("d-none", "d-block");
    setTimeout(function () {
      success.classList.replace("d-block", "d-none");
    }, 3000);
  } else if (check(temp) == 1) {
    console.log("111");
    alretExsist.innerHTML = "missing info";
    alretExsist.classList.replace("d-none", "d-block");
    setTimeout(function () {
      alretExsist.classList.replace("d-block", "d-none");
    }, 3000);
  } else if (check(temp) == 2) {
    alretExsist.innerHTML = "already exsist";
    alretExsist.classList.replace("d-none", "d-block");
    setTimeout(function () {
      alretExsist.classList.replace("d-block", "d-none");
    }, 3000);
  }
}
function check(temp) {
  if (temp.name == "" || temp.email == "" || temp.pass == "") {
    return 1;
  }
  for (let i = 0; i < users.length; i++) {
    if (temp.name === users[i].name && temp.email === users[i].email) {
      return 2;
    }
  }
  return 0;
}
function deleteSingup() {
  nameSingup.value = "";
  emailSingup.value = "";
  passSingup.value = "";
}
loginBtn != null
  ? loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (login()) {
        location.replace("http://127.0.0.1:5500/home.html");
      }
    })
  : null;
function login() {
  if (checkLogin()) {
    return true;
  } else {
    alretLogin.classList.replace("d-none", "d-block");
    setTimeout(function () {
      alretExsist.classList.replace("d-block", "d-none");
    }, 3000);
    return false;
  }
}
function checkLogin() {
  for (let i = 0; i < users.length; i++) {
    if (emailLogin.value == users[i].email) {
      if (passLogin.value == users[i].pass) {
        localStorage.setItem("currentUser", users[i].name);
        return true;
      }
    }
  }
  return false;
}
var display = function () {
  localStorage.getItem("currentUser")
    ? (welcomeUser.innerHTML += `${localStorage.getItem("currentUser")}`)
    : null;
};

display();
