var e;
var idTask, description, assignee, priority;
var myExecution;

function checkManager(){
    if (sessionStorage.actor == "jack") {
        e = document.getElementById("selAssign");
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");
        option1.value = "magy";
        option2.value = "angelina";
        option3.value = "don";
        option4.value = "tom";
        option1.text = "Magy";
        option2.text = "Angelina";
        option3.text = "Don";
        option4.text = "Tom";
        e.add(option1);
        e.add(option2);
        e.add(option3);
        e.add(option4);
    } 

    if (sessionStorage.actor == "natalie") {
        e = document.getElementById("selAssign");
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");
        var option5 = document.createElement("option");
        option1.value = "helen";
        option2.value = "diana";
        option3.value = "chris";
        option4.value = "daniel";
        option5.value = "marilyn";
        option1.text = "Helen";
        option2.text = "Diana";
        option3.text = "Chris";
        option4.text = "Daniel";
        option5.text = "Marilyn";
        e.add(option1);
        e.add(option2);
        e.add(option3);
        e.add(option4);
        e.add(option5);
    } 
}

function submitSubTask() {

    var x = document.cookie.split('=');
    idTask = Number(x[1]);
    description = document.getElementById('description').value;
    assignee = e.options[e.selectedIndex].value;
    //alert(assignee);
    var ee = document.getElementById("selPriority");
    priority = ee.options[ee.selectedIndex].value;
    //alert(priority);

    handleSTtask('php/createTaskSTM.php');
}

function handleSTtask(url) {
	var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }

    httpRequest.onreadystatechange = getSTMContents;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send('idTask=' + encodeURIComponent(idTask) +
    '&description=' + encodeURIComponent(description) +
    '&assignee=' + encodeURIComponent(assignee) +
    '&priority=' + encodeURIComponent(priority));
}

function getSTMContents(){
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
