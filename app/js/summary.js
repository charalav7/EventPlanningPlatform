var idTask, eventType, description, attendees, budget;
var start, end, decorations, food, drinks, filming;
var audio, artWork, computer, other, myExecution;

function submitSummary() {

    var x = document.cookie.split('=');
    idTask = Number(x[1]);
    eventType = document.getElementById('eventType').value;
    description = document.getElementById('description').value;
    attendees = document.getElementById('attendees').value;
    budget = document.getElementById('budget').value;
    start = document.getElementById('from').value;
    end = document.getElementById('to').value;
    decorations = document.getElementById('decorations').value;
    food = document.getElementById('food').value;
    drinks = document.getElementById('drinks').value;
    filming = document.getElementById('filming').value;
    audio = document.getElementById('audio').value;
    artWork = document.getElementById('artwork').value;
    computer = document.getElementById('computer').value;
    other = document.getElementById('other').value;
    handleSummary('php/createSummary.php');
}

function handleSummary(url) {
	var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }

    httpRequest.onreadystatechange = getContents;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send('idTask=' + encodeURIComponent(idTask) +
    '&attendees=' + encodeURIComponent(attendees) +
    '&budget=' + encodeURIComponent(budget) +
    '&eventType=' + encodeURIComponent(eventType) +
    '&description=' + encodeURIComponent(description) +
    '&from=' + encodeURIComponent(start) +
    '&to=' + encodeURIComponent(end) +
    '&decorations=' + encodeURIComponent(decorations) +
    '&food=' + encodeURIComponent(food) +
    '&drinks=' + encodeURIComponent(drinks) +
    '&filming=' + encodeURIComponent(filming) +
    '&audio=' + encodeURIComponent(audio) +
    '&artWork=' + encodeURIComponent(artWork) +
    '&computer=' + encodeURIComponent(computer) +
    '&other=' + encodeURIComponent(other));
}

function getContents(){
	if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            var response = JSON.parse(this.responseText);
            myExecution = response.result;

            if (myExecution == "success"){
                alert('Success');
                window.location = "tasklist.html";
            } else if (myExecution == "failure") {
                alert('Failure');
                window.location = "tasklist.html";
            } else {
                alert('Problem inserting.');
                window.location = "tasklist.html";
            }
            return false;

        } else {
            alert('There was a problem with this request. ');
        }
    }
}