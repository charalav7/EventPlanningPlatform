var idTask, jobTitle, jobDescription, experience;
var myExecution;

function submitStaff() {

    var x = document.cookie.split('=');
    idTask = Number(x[1]);
    jobTitle = document.getElementById('jobTitle').value;
    jobDescription = document.getElementById('jobDescription').value;
    experience = document.getElementById('experience').value;

    handleStaff('php/createStaffRequest.php');
}

function handleStaff(url) {
	var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }

    httpRequest.onreadystatechange = getStaffContents;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send('idTask=' + encodeURIComponent(idTask) +
    '&jobTitle=' + encodeURIComponent(jobTitle) +
    '&jobDescription=' + encodeURIComponent(jobDescription) +
    '&experience=' + encodeURIComponent(experience));
}

function getStaffContents(){
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