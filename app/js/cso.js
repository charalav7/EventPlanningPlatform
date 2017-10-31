var name, type, start, end, att, dec, par, ph, br, dr, budget;
var myExecution;
var status;

function pressenter() {
    document.getElementById("budget").onkeydown = function(event) {
        if (event.keyCode == 13) {
            validate();
        }
    }
}

function validate() {
    name = document.getElementById("clientRecord").value;
    type = document.getElementById("eventType").value;
    start = document.getElementById("from").value;
    end = document.getElementById("to").value;
    att = document.getElementById("attendees").value;
    dec = document.getElementById("decorations").checked;
    par = document.getElementById("parties").checked;
    ph = document.getElementById("photos").checked;
    br = document.getElementById("breakfast").checked;
    dr = document.getElementById("drinks").checked;
    budget = document.getElementById("budget").value;
    status = "created"; //event request status
    makeRequest('php/createEventRequest.php'); //to be changed for a php file

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
    httpRequest.send('clientRecord=' + encodeURIComponent(name) +
    '&eventType=' + encodeURIComponent(type) +
    '&eventStartDateTime=' + encodeURIComponent(start) +
    '&eventEndDateTime=' + encodeURIComponent(end) +
    '&attendees=' + encodeURIComponent(att) +
    '&decorations=' + encodeURIComponent(dec) +
    '&parties=' + encodeURIComponent(par) +
    '&photos=' + encodeURIComponent(ph) +
    '&breakfast=' + encodeURIComponent(br) +
    '&drinks=' + encodeURIComponent(dr) +
    '&budget=' + encodeURIComponent(budget));
}

function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var response = JSON.parse(httpRequest.responseText);
            myExecution = response.result;

            if (myExecution == "success"){
                alert('Success');
                window.location = "cso.html";
            } else if (myExecution == "failure") {
                alert('Failure');
                window.location = "cso.html";
            } else {
                alert('Problem inserting.');
                window.location = "cso.html";
            }
            return false;

        } else {
            alert('There was a problem with this request. ' + httpRequest.status);
        }
    }
}
