'use strict';

/**
 * Login submit button event handler callback.
 *
 * @param {object} click event
 *
 */

function loginHandler(evt) {
  let loginData = constructFormJson(evt, "loginForm");

  $.ajax({
    url: "/login",
    type: "POST",
    data: loginData,
    success: function(response) {

      if ((typeof response) == "object") {
        setCookie("token", response.token, 10000);
        // Convert T / F to admin / user to maintain compatibility with existing front end code
        if(response.adminStatus){
          setCookie("adminStatus", "admin", 10000);
        }else{
          setCookie("adminStatus", "user", 10000);
        }
        setCookie("email", response.email, 10000);
        //redirect
        window.location.href = "allAds.html";
      }
      else {
        alert(response);
      }
    },
    error: function() {
        displayError("Communication with the server has failed. Please try again later.");
    }
  });
}


/**
 * Add loginHandler to login button.
 *
 */
function addLogin() {
  let loginElem = $("#loginForm");
  loginElem.submit(loginHandler);
}


/**
 * Sign Up submit button event handler callback.
 *
 * @param {object} click event
 *
 */
function signUpHandler(evt) {
  let signUpData = constructFormJson(evt, "signUpForm");

  $.ajax({
    url: "/signup",
    type: "POST",
    data: signUpData,
    success: function(response) {
      if (response == "Thank you for joining us. Please check your email to get started!"){
        window.location.reload();
        alert(response);
      }
      else {
        alert(response);
        window.location.reload();
      }

    },
    error: function() {
      displayError("Communication with the server has failed. Please try again later.");
    }
  });
}

/**
 * Add Sign Up Handler to login button.
 *
 */
function addSignUp() {
  let signUpElem = $("#signUpForm");
  signUpElem.submit(signUpHandler);
}


function addForgotPassword() {
  let forgotPwordElem = $("#forgotPword");
  forgotPwordElem.click(function() {
      let loginData = {"email": $("#email").val()};
      if (loginData == "") {
        alert("Please enter your email!");
      }
      else {
        $.ajax({
          url: "/resetPassword",
          type: "POST",
          data: loginData,
          success: function(response) {
            if (response == "Success") {
              alert("Your new password has been sent to your email!");
            }
            else {
              alert(response);
            }
          },
          error: function() {
              displayError("Communication with the server has failed. Please try again later.");
          }
        });
      }
  });
}

/**
 * Init Method.
 */
function init() {
   addLogin();
   addSignUp();
   addForgotPassword();
 }

$(document).ready(function() {
  init();
});
