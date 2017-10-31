var level = [];
var idTask = [];
var getEvent, getSCSOdecision;

function name() {
    if (!sessionStorage.actor) {
        window.location = "index.html";
    } else {
        if (window.location.pathname == "/app/cso.html" && sessionStorage.actor != "sarah") {
            window.location = "index.html";
        } else {
            document.title = "SEP " + jsUcfirst(sessionStorage.actor);
            document.getElementById("makevisible").style.visibility = "visible";
            document.getElementById("displayactor").innerHTML = "<h1>Welcome " + jsUcfirst(sessionStorage.actor) + " </h1>";
            if (sessionStorage.actor != "sarah" && sessionStorage.actor != "magy") {
                makeTaskRequest('php/getTaskList.php', sessionStorage.actor); //to be added
            }
        }
    }

}

//function to capitalize first letter of a string
function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function makeTaskRequest(url, actor) {
    var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }

    httpRequest.onreadystatechange = showTasks;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send('username=' + encodeURIComponent(actor));
}

function showTasks() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            var response = JSON.parse(this.responseText);

            var table = "<thead><tr><th>Task ID</th><th>Subject</th><th>Description</th><th>Priority</th><th>Status</th><th>Event Record</th><th>Creator</th><th>Assignee</th></tr></thead>";
            table += "<tbody>";

            for (var i = 0; i < response.length; i++) {
                table += "<tr><td>" + response[i].idTask + "</td><td>" + response[i].subject + "</td><td>" + response[i].description + "</td><td>" + response[i].priority + "</td><td>" + response[i].status + "</td><td>" + response[i].eventRecord + "</td><td>" + response[i].creator + "</td><td>" + response[i].assignee + "</td></tr>";
                level.push(Number(response[i].status));
                idTask.push(Number(response[i].idTask));
            }


            table += "</tbody>";

            document.getElementById("listTitle").innerHTML = "<h3>List with tasks</h3>";
            document.getElementById("displaytasks").innerHTML = table;

            addTaskHandler();

        }
    }
}

function addTaskHandler() {
    //var tasklist = document.getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerHTML;
    //var cells = tasklist.getElementsByTagName("td");

    var length = 1;

    while (document.getElementsByTagName('tr')[length]) {
        length++;
    }

    for (var i = 1; i < length; i++) {
        var currentRow = document.getElementsByTagName('tr')[i];
        var pos = i - 1;

        var createClickHandler =
            function(row, pos) {
                return function() {

                    //Case SCSO
                    if (sessionStorage.actor == "janet") {
                        //case after CSO sends a new event request
                        if (level[pos] == 1) {

                            var httpRequest = new XMLHttpRequest();

                            if (!httpRequest) {
                                alert('Giving up :( Cannot create an XMLHTTP instance');
                                return false;
                            }

                            httpRequest.onreadystatechange = showEvent;
                            httpRequest.open('POST', 'php/getEventFromTask.php');
                            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                            httpRequest.send('idTask=' + encodeURIComponent(idTask[pos]));

                            row.setAttribute("data-toggle", "modal");
                            row.setAttribute("data-target", "#myModal");


                        }
                        //case after AM accepted a new event
                        if (level[pos] == 4) {
                            document.getElementById('ModalLabel').innerHTML = "Create Summary";
                            document.getElementById('ModalBody').innerHTML = "&nbsp&nbsp&nbsp&nbsp<textarea></textarea>";
                            document.getElementById('ModalBody').setAttribute("rows", "6");
                            document.getElementById('ModalBody').setAttribute("cols", "100");
                            document.getElementById('ModalBody').setAttribute("name", "summary");
                            document.getElementById('FooterDefault').innerHTML = "Cancel";
                            document.getElementById('FooterSecond').innerHTML = "Send";
                            row.setAttribute("data-toggle", "modal");
                            row.setAttribute("data-target", "#myModal");
                        }
                    }

                    //var cell = row.getElementsByTagName("td")[0].innerHTML;
                    //alert("cell:" + cell);
                };
            };

        currentRow.onclick = createClickHandler(currentRow, pos);
    }
    //alert(tasklist);

}



function showEvent() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            var response = JSON.parse(this.responseText);

            getEvent = "<p>&nbsp&nbsp&nbsp&nbsp <b>Event Record: </b>" + response.task.eventRecord + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Event Type: </b>" + response.task.eventType + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Start Date:</b> " + response.task.eventStartDateTime + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>End Date:</b> " + response.task.eventEndDateTime + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Attendees:</b> " + response.task.attendees + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Budget:</b> " + response.task.budget + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Client Name:</b> " + response.task.clientName + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Company:</b> " + response.task.company + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Preferences:</b> " + response.preferences + "</p>";

            document.getElementById('ModalLabel').innerHTML = "Approve or Reject the New Event Eequest?"; //+ row.getElementsByTagName('td')[0].innerHTML + ": New Event Request";
            document.getElementById('ModalBody').innerHTML = "&nbsp&nbsp&nbsp&nbsp" + getEvent;
            document.getElementById('FooterDefault').innerHTML = "Reject";
            document.getElementById('FooterSecond').innerHTML = "Approve";



            document.getElementById('FooterDefault').onclick = function() {
                getSCSOdecision = 'rejected';
                var httpRequestD = new XMLHttpRequest();

                if (!httpRequestD) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                httpRequestD.onreadystatechange = getDecision;
                httpRequestD.open('POST', 'php/scsoDecision.php');
                httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequestD.send('idTask=' + encodeURIComponent(idTask[pos]) + '&decision=' + encodeURIComponent(getSCSOdecision));
                window.location = "tasklist.html";
            }

            document.getElementById('FooterSecond').onclick = function() {
                getSCSOdecision = 'accepted';
                var httpRequestD = new XMLHttpRequest();

                if (!httpRequestD) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                httpRequestD.onreadystatechange = getDecision;
                httpRequestD.open('POST', 'php/scsoDecision.php');
                httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequestD.send('idTask=' + encodeURIComponent(idTask[pos]) + '&decision=' + encodeURIComponent(getSCSOdecision));
                window.location = "tasklist.html";

            }

        }
    }
}

function getDecision() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            var response = JSON.parse(this.responseText);
            alert(response.result);
        }
    }
}


window.onload = name;