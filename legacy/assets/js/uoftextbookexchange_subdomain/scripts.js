// Replaces the entire page with an error
function displayError(err){
	$("#page-content-wrapper").html("<h1>An error has occured. Details: " + err + "</h2>");
}

// Admin view modificaitons
function adminStuff(){
	if(getCookie("adminStatus") == "admin"){
		$(".admin").css('visibility','visible');
	}
}

// Kick out if not admin
function adminStatusCheck(){
	if(getCookie("adminStatus") != "admin"){
		displayError("This page is restricted for admins only!");
	}
}

// Kick out if not logged in
function loginCheck(){
	if(getCookie("adminStatus") == ""){
		alert("You must be logged in to view this page. ");
		window.location.href = "index.html";
	}
}

/**
 * Helper function for form buttons to construct a JSON from the fields.
 *
 * @param {object} click event
 * @param {string} formID
 * @return {object} dataSet
 *
 */
function constructFormJson(evt, formID) {
  evt.preventDefault();
  let formData = $(("#"+formID)).serializeArray();
  let dataSet = {};
  for (let i = 0; i < formData.length; i++) {
    dataSet[(formData[i])["name"]] = (formData[i])["value"].trim();
  }
  return dataSet;
}


function logout() {
	let logoutData = {"token": getCookie("token"), "email": getCookie("email")};
	$.ajax({
		url: "/logout",
		type: "POST",
		data: logoutData,
		success: function(response) {
			if (response == "Successfully logged out\n") {
				let cookies = document.cookie.split(";");
				for (let i = 0; i < cookies.length; i++) {
					let cookie = cookies[i];
					let cookieCrumbs = cookie.split("=");
					document.cookie = cookieCrumbs[0] +
															"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
				}
				//redirect
				window.location.href = "index.html";
			}
			else {
				alert("Error: Unable to logout at this time.");
			}
		},
		error: function() {
				displayError("Communication with the server has failed. Please try again later.");
		}
	});
}
