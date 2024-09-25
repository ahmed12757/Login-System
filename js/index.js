// & HTML ELMENT
var NameInput = document.querySelector("#floatingName");
var EmailInput = document.querySelector("#floatingEmail");
var PasswordInput = document.querySelector("#floatingPassword");
var EmailInputIn = document.querySelector("#floatingEmailIn");
var PasswordInputIn = document.querySelector("#floatingPasswordIn");
var signUpPtn = document.querySelector("#signUp");
var LoginPtn = document.querySelector("#Login");
var LinkSignIn = document.querySelector("div p a#in");
var LinkSignUp = document.querySelector("div p a#up");
var username = document.querySelector("#username");
var index;
// * add veriable
var informationList = JSON.parse(localStorage.getItem("info")) || [];
var usernameget = JSON.parse(localStorage.getItem("user"));
if (username) {
  username.innerHTML = usernameget;
}
var NameRegex = /^[A-Z]+(\s*[ـ\-&\S]\s*\w+)+$/;
var emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
var passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
var emailInRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
var passwordInRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
// ^ function
function clearInput() {
  NameInput.value = "";
  EmailInput.value = "";
  PasswordInput.value = "";
  EmailInputIn.value = "";
  PasswordInputIn.value = "";
}

function validateallUp(RegexUp, elementUp) {
  if (RegexUp.test(elementUp.value)) {
    elementUp.classList.add("is-valid");
    elementUp.classList.remove("is-invalid");
    elementUp.nextElementSibling.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    elementUp.classList.add("is-invalid");
    elementUp.classList.remove("is-valid");
    elementUp.nextElementSibling.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
function validateallIn(RegexIn, elementIn) {
  if (RegexIn.test(elementIn.value)) {
    elementIn.classList.add("is-valid");
    elementIn.classList.remove("is-invalid");
    return true;
  } else {
    elementIn.classList.add("is-invalid");
    elementIn.classList.remove("is-valid");
    return false;
  }
}
function replaceIn() {
  LinkSignIn.closest("div").classList.add("d-none");
  LinkSignUp.closest("div").classList.replace("d-none", "d-block");
}
function replaceUp() {
  LinkSignUp.closest("div").classList.replace("d-block", "d-none");
  LinkSignIn.closest("div").classList.replace("d-none", "d-block");
}
function newpage() {
  window.location.href = "./index/index.html";
}

function display(i) {
  index = i;
  username.innerHTML = JSON.parse(localStorage.getItem("user"))[index];
  return index;
}
// ! events

signUpPtn.addEventListener("click", function () {
  if (
    validateallUp(NameRegex, NameInput) &&
    validateallUp(emailRegex, EmailInput) &&
    validateallUp(passwordRegex, PasswordInput)
  ) {
    var information = {
      name: NameInput.value,
      email: EmailInput.value,
      password: PasswordInput.value,
    };
    informationList.push(information);
    localStorage.setItem("info", JSON.stringify(informationList));
    clearInput();
    NameInput.closest("form").nextElementSibling.classList.add("d-none");
    NameInput.closest(
      "form"
    ).nextElementSibling.nextElementSibling.classList.replace(
      "d-none",
      "d-block"
    );
  } else {
    NameInput.closest("form").nextElementSibling.classList.replace(
      "d-none",
      "d-block"
    );
    NameInput.closest(
      "form"
    ).nextElementSibling.nextElementSibling.classList.add("d-none");
  }
});
LoginPtn.addEventListener("click", function () {
  if (
    validateallIn(emailInRegex, EmailInputIn) &&
    validateallIn(passwordInRegex, PasswordInputIn)
  ) {
    for (var i = 0; i < informationList.length; i++) {
      if (
        informationList[i].email === EmailInputIn.value &&
        informationList[i].password === PasswordInputIn.value
      ) {
        localStorage.setItem("user", JSON.stringify(informationList[i].name));
        newpage();
        clearInput();
        display(i);
      }
    }

    EmailInputIn.closest("form").nextElementSibling.classList.add("d-none");
  } else {
    EmailInputIn.closest("form").nextElementSibling.classList.replace(
      "d-none",
      "d-block"
    );
  }
});
NameInput.addEventListener("change", function () {
  validateallUp(NameRegex, NameInput);
});
EmailInput.addEventListener("change", function () {
  validateallUp(emailRegex, EmailInput);
});
PasswordInput.addEventListener("change", function () {
  validateallUp(passwordRegex, PasswordInput);
});
EmailInputIn.addEventListener("change", function () {
  validateallIn(emailInRegex, EmailInputIn);
});
PasswordInputIn.addEventListener("change", function () {
  validateallIn(passwordInRegex, PasswordInputIn);
});

// reblace page
LinkSignIn.addEventListener("click", function () {
  replaceIn();
});
LinkSignUp.addEventListener("click", function () {
  replaceUp();
});
