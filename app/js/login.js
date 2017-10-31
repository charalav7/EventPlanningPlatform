var myCreds,
    myRole;
var username, password;
var httpRequest;
var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
//sessionStorage.actor = "null";
function validate() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    makeRequest('php/getCredentials.php');
}

function makeRequest(url) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send('username=' + encodeURIComponent(username) +
                    '&password=' + encodeURIComponent(password));
}

function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var response = JSON.parse(httpRequest.responseText);
            myCreds = response.creds;
            myRole = response.role;
            alert("creds: " + myCreds + " role: " + myRole);

            if (myCreds == "true") {
            	sessionStorage.actor = username;
                sessionStorage.logged = "true";
                if (myRole == "CSO") {
                    window.location = "cso.html"; // Redirecting to other page.
                } else { 
                	window.location = "tasklist.html";
                }

                return false;
            } else {
                attempt--; // Decrementing by one.
                alert("Attempts left: " + attempt);
                // Disabling fields after 3 attempts.
                if (attempt === 0) {
                    document.getElementById("username").disabled = true;
                    document.getElementById("password").disabled = true;
                    document.getElementById("submitLogin").disabled = true;
                    return false;
                }
                //alert(response.password + " " + response.role);
            }

        } else {
            alert('There was a problem with the request.');
        }
    }
}

function pressenter() {
    document.getElementById("password").onkeydown = function(event) {
        if (event.keyCode == 13) {
            validate();
        }
    }
}
