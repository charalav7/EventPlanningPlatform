var idTask = [];
var level = [];
var eventRecord = [];
var getEvent, getSCSOdecision, getAMdecision;
var condition, stands;
var idSummary;
var getEventAfter;

//just a test function to check the possibility of refreshing the tables every 1 sec
function taskListRefresh(){
    setInterval(welcomeActor, 1000);
}

function welcomeActor() {
    if (!sessionStorage.actor) {
        window.location = "index.html";
    } else {
        if (window.location.pathname == "/app/cso.html" && sessionStorage.actor != "sarah") {
            window.location = "index.html";
        } else if (window.location.pathname == "/app/summary.html" && sessionStorage.actor != "janet") {
            window.location = "index.html";
        } else if (window.location.pathname == "/app/summary.html" && sessionStorage.actor == "janet") {
            document.title = "SEP Event Summary";
            document.getElementById("makevisible").style.visibility = "visible";
            document.getElementById("displayactor").innerHTML = "<h1>New event request summary for task #" + Cookies.get('idTaskk') + "</h1>";
        } else if ((window.location.pathname == "/app/jobAd.html" && (sessionStorage.actor != "jack")) && (window.location.pathname == "/app/jobAd.html" && (sessionStorage.actor != "natalie"))) {
            window.location = "index.html";
        } else if (window.location.pathname == "/app/jobAd.html" && (sessionStorage.actor == "jack" || sessionStorage.actor == "natalie")) {
            document.title = "SEP Staff Request";
            document.getElementById("makevisible").style.visibility = "visible";
            document.getElementById("displayactor").innerHTML = "<h1>New staff request for task #" + Cookies.get('idTaskk') + "</h1>";
        } else if ((window.location.pathname == "/app/taskSTM.html" && (sessionStorage.actor != "jack")) && (window.location.pathname == "/app/taskSTM.html" && (sessionStorage.actor != "natalie"))) {
            window.location = "index.html";
        } else if (window.location.pathname == "/app/taskSTM.html" && (sessionStorage.actor == "jack" || sessionStorage.actor == "natalie")) {
            document.title = "SEP SubTeam Request";
            document.getElementById("makevisible").style.visibility = "visible";
            document.getElementById("displayactor").innerHTML = "<h1>New subteam task #" + Cookies.get('idTaskk') + "</h1>";
            checkManager();
        } else if ((window.location.pathname == "/app/budgetNegotiation.html" && (sessionStorage.actor != "jack")) && (window.location.pathname == "/app/budgetNegotiation.html" && (sessionStorage.actor != "natalie"))) {
            window.location = "index.html";
        } else if (window.location.pathname == "/app/budgetNegotiation.html" && (sessionStorage.actor == "jack" || sessionStorage.actor == "natalie")) {
            document.title = "SEP Budget Negotiation";
            document.getElementById("makevisible").style.visibility = "visible";
            document.getElementById("displayactor").innerHTML = "<h1>New budget negotiation for task #" + Cookies.get('idTaskk') + "</h1>";
        } else {
            document.title = "SEP " + jsUcfirst(sessionStorage.actor);
            document.getElementById("makevisible").style.visibility = "visible";
            document.getElementById("displayactor").innerHTML = "<h1>Welcome " + jsUcfirst(sessionStorage.actor) + " </h1>";

            if (sessionStorage.actor != "sarah") {
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
                level.push(new Number(response[i].status));
                idTask.push(Number(response[i].idTask));
                eventRecord.push(new Number(response[i].eventRecord));
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

                    condition = level[pos];
                    stands = pos;

                    //Case SCSO
                    if (sessionStorage.actor == "janet") {
                        var httpRequest = new XMLHttpRequest();

                        if (!httpRequest) {
                            alert('Giving up :( Cannot create an XMLHTTP instance');
                            return false;
                        }

                        httpRequest.onreadystatechange = showEvent;
                        httpRequest.open('POST', 'php/getEventAndInitialPreferenceFromTask.php');
                        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        httpRequest.send('idTask=' + encodeURIComponent(idTask[stands]));

                        row.setAttribute("data-toggle", "modal");
                        row.setAttribute("data-target", "#myModal");
                    }

                    //case FM
                    if (sessionStorage.actor == "alice") {
                        var httpRequest = new XMLHttpRequest();

                        if (!httpRequest) {
                            alert('Giving up :( Cannot create an XMLHTTP instance');
                            return false;
                        }

                        httpRequest.onreadystatechange = showEvent;
                        httpRequest.open('POST', 'php/getEventAndInitialPreferenceFromTask.php');
                        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        httpRequest.send('idTask=' + encodeURIComponent(idTask[stands]));

                        row.setAttribute("data-toggle", "modal");
                        row.setAttribute("data-target", "#myModal");
                    }

                    //case AM
                    if (sessionStorage.actor == "mike") {
                        var httpRequest = new XMLHttpRequest();

                        if (!httpRequest) {
                            alert('Giving up :( Cannot create an XMLHTTP instance');
                            return false;
                        }

                        httpRequest.onreadystatechange = showEvent;
                        httpRequest.open('POST', 'php/getEventAndInitialPreferenceFromTask.php');
                        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        httpRequest.send('idTask=' + encodeURIComponent(idTask[stands]));

                        row.setAttribute("data-toggle", "modal");
                        row.setAttribute("data-target", "#myModal");
                    }

                    //case STM
                    if (sessionStorage.actor == "jack" || sessionStorage.actor == "natalie") {
                        var httpRequest = new XMLHttpRequest();

                        if (!httpRequest) {
                            alert('Giving up :( Cannot create an XMLHTTP instance');
                            return false;
                        }

                        httpRequest.onreadystatechange = showEventAfter;
                        httpRequest.open('POST', 'php/getEventFromTask.php');
                        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        httpRequest.send('idTask=' + encodeURIComponent(idTask[stands]));

                        row.setAttribute("data-toggle", "modal");
                        row.setAttribute("data-target", "#myModal");
                    }

                    //case HR
                    if (sessionStorage.actor == "simon") {
                        var httpRequest = new XMLHttpRequest();

                        if (!httpRequest) {
                            alert('Giving up :( Cannot create an XMLHTTP instance');
                            return false;
                        }

                        httpRequest.onreadystatechange = showEventAfter;
                        httpRequest.open('POST', 'php/getEventFromTask.php');
                        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        httpRequest.send('idTask=' + encodeURIComponent(idTask[stands]));

                        row.setAttribute("data-toggle", "modal");
                        row.setAttribute("data-target", "#myModal");
                    }

                    //case decoration team
                    if (sessionStorage.actor == "magy" || sessionStorage.actor == "angelina" || sessionStorage.actor == "don" ||sessionStorage.actor == "tom") {
                        var httpRequest = new XMLHttpRequest();

                        if (!httpRequest) {
                            alert('Giving up :( Cannot create an XMLHTTP instance');
                            return false;
                        }

                        httpRequest.onreadystatechange = showEventAfter;
                        httpRequest.open('POST', 'php/getEventFromTask.php');
                        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        httpRequest.send('idTask=' + encodeURIComponent(idTask[stands]));

                        row.setAttribute("data-toggle", "modal");
                        row.setAttribute("data-target", "#myModal");
                    }

                    //case chef team
                    if (sessionStorage.actor == "helen" || sessionStorage.actor == "diana" || sessionStorage.actor == "chris" ||sessionStorage.actor == "daniel" ||sessionStorage.actor == "marilyn") {
                        var httpRequest = new XMLHttpRequest();

                        if (!httpRequest) {
                            alert('Giving up :( Cannot create an XMLHTTP instance');
                            return false;
                        }

                        httpRequest.onreadystatechange = showEventAfter;
                        httpRequest.open('POST', 'php/getEventFromTask.php');
                        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        httpRequest.send('idTask=' + encodeURIComponent(idTask[stands]));

                        row.setAttribute("data-toggle", "modal");
                        row.setAttribute("data-target", "#myModal");
                    }


                };
            };
        currentRow.onclick = createClickHandler(currentRow, pos);
    }
}

function showEvent() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            var response = JSON.parse(this.responseText);

            var preferences = [];

            if (response.preferences) {
                for (var i = 0; i < response.preferences.length; i++) {
                    preferences.push(" " + response.preferences[i].preference);
                }
            }

            getEvent = "<p>&nbsp&nbsp&nbsp&nbsp <b>Event Record: </b>" + response.task.eventRecord + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Event Type: </b>" + response.task.eventType + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Start Date:</b> " + response.task.eventStartDateTime + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>End Date:</b> " + response.task.eventEndDateTime + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Attendees:</b> " + response.task.attendees + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Budget:</b> " + response.task.budget + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Client Name:</b> " + response.task.clientName + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Company:</b> " + response.task.company + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Preferences:</b> " + preferences.toString() + "</p>";

            //SCSO test cases
            //condition = created
            if (condition == 1) {
                document.getElementById('ModalLabel').innerHTML = "Approve or Reject the New Event Request"; //+ row.getElementsByTagName('td')[0].innerHTML + ": New Event Request";
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
                    httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]) + '&decision=' + encodeURIComponent(getSCSOdecision));

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
                    httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]) + '&decision=' + encodeURIComponent(getSCSOdecision));


                }
            }

            //condition = acceptedByAM
            if (condition == 4) {
                document.getElementById('ModalLabel').innerHTML = "Create Summary";
                document.getElementById('ModalBody').innerHTML = "&nbsp&nbsp&nbsp&nbsp" + getEvent;

                document.getElementById('FooterDefault').innerHTML = "Cancel";
                document.getElementById('FooterSecond').innerHTML = "Create";

                document.getElementById('FooterSecond').onclick = function() {
                    idSummary = idTask[stands];
                    Cookies.set('idTaskk', idSummary);
                    window.location = "summary.html";
                }
            }

            //FM test cases
            //condition = acceptedBySCSO
            if (condition == 2) {
                document.getElementById('ModalLabel').innerHTML = "Write Feedback";
                document.getElementById('ModalBody').innerHTML = "&nbsp&nbsp&nbsp&nbsp" + getEvent;
                var elem = document.createElement("textarea");
                var elemCont = document.getElementById("ModalBody2");

                elem.setAttribute("placeholder", "Write here your feedback...");
                elem.setAttribute("cols", 45);
                elem.setAttribute("rows", 4);

                elemCont.appendChild(elem);

                document.getElementById('FooterDefault').innerHTML = "Cancel";
                document.getElementById('FooterSecond').innerHTML = "Submit";

                document.getElementById('closemodal').onclick = function() {
                    elemCont.removeChild(elem);
                }

                document.getElementById('FooterDefault').onclick = function() {
                    elemCont.removeChild(elem);
                }

                document.getElementById('FooterSecond').onclick = function() {

                    var httpRequestD = new XMLHttpRequest();

                    if (!httpRequestD) {
                        alert('Giving up :( Cannot create an XMLHTTP instance');
                        return false;
                    }

                    httpRequestD.onreadystatechange = getDecision;
                    httpRequestD.open('POST', 'php/fmProcess.php');
                    httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]) + '&description=' + encodeURIComponent(elem.value));
                    elemCont.removeChild(elem);

                }
            }

            //condition = pendingRequest
            if (condition == 9) {
                var httpRequestF = new XMLHttpRequest();

                if (!httpRequestF) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                httpRequestF.onreadystatechange = getBudgetNeg;
                httpRequestF.open('POST', 'php/getFinancialRequest.php');
                httpRequestF.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequestF.send('idTask=' + encodeURIComponent(idTask[stands]));

            }

            //AM test case
            //condition = processedByFM
            if (condition == 5) {

                var httpRequest2 = new XMLHttpRequest();

                if (!httpRequest2) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                httpRequest2.onreadystatechange = showSummary;
                httpRequest2.open('POST', 'php/getEventRequestFeedback.php');
                httpRequest2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequest2.send('idTask=' + encodeURIComponent(idTask[stands]));

            }
        }
    }
}

function getBudgetNeg() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            var response = JSON.parse(this.responseText);

            document.getElementById('ModalLabel').innerHTML = "Budget Negotiation";
            document.getElementById('ModalBody').innerHTML = "<br>&nbsp&nbsp&nbsp&nbsp<b>Amount: </b>" + response.amount + "<br>&nbsp&nbsp&nbsp&nbsp<b>Reason: </b>" + response.reason + "<br><br>&nbsp&nbsp&nbsp&nbsp<b>Insert budget negotiation: </b>";

            var elem = document.createElement("input");
            var elemCont = document.getElementById("ModalBody2");

            elem.setAttribute("placeholder", "Amount...");
            elem.setAttribute("type", "number");

            elemCont.appendChild(elem);

            document.getElementById('FooterDefault').innerHTML = "Close";
            document.getElementById('FooterSecond').innerHTML = "Send";

            document.getElementById('closemodal').onclick = function() {
                elemCont.removeChild(elem);
            }

            document.getElementById('FooterDefault').onclick = function() {
                elemCont.removeChild(elem);
            }

            document.getElementById('FooterSecond').onclick = function() {

                var httpRequestD = new XMLHttpRequest();

                if (!httpRequestD) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                httpRequestD.onreadystatechange = getDecision;
                httpRequestD.open('POST', 'php/fmBudgetNegotiation.php');
                httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]) + '&amount=' + encodeURIComponent(elem.value));
                elemCont.removeChild(elem);
            }
        }
    }
}

function showEventAfter() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            var response = JSON.parse(this.responseText);

            var preferences = [];

            if (response.preferences) {
                for (var i = 0; i < response.preferences.length; i++) {
                    preferences.push(response.preferences[i].preference + ": " + response.preferences[i].description);
                }
            }

            getEventAfter = "<p>&nbsp&nbsp&nbsp&nbsp <b>Event Record: </b>" + response.task.eventRecord + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Event Type: </b>" + response.task.eventType + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Start Date:</b> " + response.task.eventStartDateTime + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>End Date:</b> " + response.task.eventEndDateTime + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Attendees:</b> " + response.task.attendees + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Budget:</b> " + response.task.budget + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Client Name:</b> " + response.task.clientName + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Company:</b> " + response.task.company + "</p>" + "<p>&nbsp&nbsp&nbsp&nbsp <b>Preferences:</b> " + "</p>";

            //STM test cases
            //condition = summaryCreated
            if (condition == 6) {
                document.getElementById('ModalLabel').innerHTML = "Event Request Open or More Staff Needed?";
                document.getElementById('ModalBody').innerHTML = "&nbsp&nbsp&nbsp&nbsp" + getEventAfter;
                document.getElementById('ModalBody2').innerHTML = preferences.join(" <br> ");
                document.getElementById('FooterDefault').innerHTML = "Staff Request";
                document.getElementById('FooterSecond').innerHTML = "Open";

                document.getElementById('FooterDefault').onclick = function() {

                    Cookies.set('idTaskk', idTask[stands]);
                    window.location = "jobAd.html";

                }

                document.getElementById('FooterSecond').onclick = function() {

                    var httpRequestD = new XMLHttpRequest();

                    if (!httpRequestD) {
                        alert('Giving up :( Cannot create an XMLHTTP instance');
                        return false;
                    }

                    httpRequestD.onreadystatechange = getDecision;
                    httpRequestD.open('POST', 'php/openTask.php');
                    httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]));

                }
            }

            //condition=open
            if (condition == 7) {
                document.getElementById('ModalLabel').innerHTML = "Event Request is Open";
                document.getElementById('ModalBody').innerHTML = "&nbsp&nbsp&nbsp&nbsp" + getEventAfter;
                document.getElementById('ModalBody2').innerHTML = preferences.join(" <br> ");

                var elem = document.createElement("button");
                var elemCont = document.getElementById("finalbuttons");

                elem.setAttribute("class", "btn btn-default");
                elem.setAttribute("type", "button");
                elem.setAttribute("data-dismiss", "modal");
                elem.innerHTML = "Create Task";

                elemCont.insertBefore(elem, elemCont.childNodes[0]);

                document.getElementById('FooterDefault').innerHTML = "Budget Negotiation";
                document.getElementById('FooterSecond').innerHTML = "Finished";

                document.getElementById('closemodal').onclick = function() {
                    elemCont.removeChild(elem);
                }

                elem.onclick = function() {

                    Cookies.set('idTaskk', idTask[stands]);
                    elemCont.removeChild(elem);
                    window.location = "taskSTM.html";
                }

                document.getElementById('FooterDefault').onclick = function() {

                    Cookies.set('idTaskk', idTask[stands]);
                    elemCont.removeChild(elem);
                    window.location = "budgetNegotiation.html";

                }

                document.getElementById('FooterSecond').onclick = function() {

                    var httpRequestD = new XMLHttpRequest();

                    if (!httpRequestD) {
                        alert('Giving up :( Cannot create an XMLHTTP instance');
                        return false;
                    }

                    httpRequestD.onreadystatechange = getDecision;
                    httpRequestD.open('POST', 'php/finishTaskSTM.php');
                    httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]));
                    elemCont.removeChild(elem);
                }
            }

            //condition=budgetNegotiated
            if (condition == 14) {
                document.getElementById('ModalLabel').innerHTML = "Budget Negotiated";
                document.getElementById('ModalBody').innerHTML = "<br>&nbsp&nbsp&nbsp&nbsp" + "The budget was successfully approved by the Financial Manager";
                document.getElementById('ModalBody2').innerHTML = "";

                document.getElementById('FooterDefault').innerHTML = "Close";
                document.getElementById('FooterSecond').innerHTML = "Finished";

                document.getElementById('FooterSecond').onclick = function() {

                    var httpRequestD = new XMLHttpRequest();

                    if (!httpRequestD) {
                        alert('Giving up :( Cannot create an XMLHTTP instance');
                        return false;
                    }

                    httpRequestD.onreadystatechange = getDecision;
                    httpRequestD.open('POST', 'php/finishTask.php');
                    httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]));

                }
            }

            //condition=reviewSTM
            if (condition == 8) {
                var httpRequestD = new XMLHttpRequest();

                if (!httpRequestD) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                httpRequestD.onreadystatechange = getSTreview;
                httpRequestD.open('POST', 'php/getPlan.php');
                httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]));
            }

            //HR test cases
            //condition = staffRequest
            if (condition == 11) {
                var httpRequestD = new XMLHttpRequest();

                if (!httpRequestD) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                httpRequestD.onreadystatechange = getHRrequest;
                httpRequestD.open('POST', 'php/getStaffRequest.php');
                httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]));
            }

            //ST test case
            //condition = pendingPlan
            if (condition == 15) {
                document.getElementById('ModalLabel').innerHTML = "Create Plan";
                document.getElementById('ModalBody').innerHTML = "<br>&nbsp&nbsp&nbsp&nbsp<b>Description: </b>";
                var elem = document.createElement("textarea");
                var elemCont = document.getElementById("ModalBody2");

                elem.setAttribute("placeholder", "Write here your plan...");
                elem.setAttribute("cols", 45);
                elem.setAttribute("rows", 6);

                elemCont.appendChild(elem);

                document.getElementById('FooterDefault').innerHTML = "Cancel";
                document.getElementById('FooterSecond').innerHTML = "Submit";

                document.getElementById('closemodal').onclick = function() {
                    elemCont.removeChild(elem);
                }

                document.getElementById('FooterDefault').onclick = function() {
                    elemCont.removeChild(elem);
                }

                document.getElementById('FooterSecond').onclick = function() {

                    var httpRequestS = new XMLHttpRequest();

                    if (!httpRequestS) {
                        alert('Giving up :( Cannot create an XMLHTTP instance');
                        return false;
                    }

                    httpRequestS.onreadystatechange = getDecision;
                    httpRequestS.open('POST', 'php/createPlan.php');
                    httpRequestS.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    httpRequestS.send('idTask=' + encodeURIComponent(idTask[stands]) + '&description=' + encodeURIComponent(elem.value));
                    elemCont.removeChild(elem);
                }
            }


        }
    }
}

function getDecision() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            //alert(this.responseText);
            var response = JSON.parse(this.responseText);
            alert(response.result);
            window.location = "tasklist.html";
        }
    }
}

function getSTreview() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            var response = JSON.parse(this.responseText);

            document.getElementById('ModalLabel').innerHTML = "Review SubTeam plan";
            document.getElementById('ModalBody').innerHTML = "<br>&nbsp&nbsp&nbsp&nbsp" + response.description;
            document.getElementById('ModalBody2').innerHTML ="";

            document.getElementById('FooterDefault').innerHTML = "Close";
            document.getElementById('FooterSecond').innerHTML = "Finished";

            document.getElementById('FooterSecond').onclick = function() {

                var httpRequestD = new XMLHttpRequest();

                if (!httpRequestD) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                httpRequestD.onreadystatechange = getDecision;
                httpRequestD.open('POST', 'php/finishTask.php');
                httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]));

            }
        }
    }
}

function getHRrequest() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            var response = JSON.parse(this.responseText);

            document.getElementById('ModalLabel').innerHTML = "New Staff Requested";
            document.getElementById('ModalBody').innerHTML = "<br>&nbsp&nbsp&nbsp&nbsp<b>Job Title: </b>" + response.jobTitle + "<br>&nbsp&nbsp&nbsp&nbsp<b>Job Description: </b>" + response.jobDescription + "<br>&nbsp&nbsp&nbsp&nbsp<b>Experience: </b>" + response.experience;

            document.getElementById('FooterDefault').innerHTML = "Close";
            document.getElementById('FooterSecond').innerHTML = "Done";

            document.getElementById('FooterSecond').onclick = function() {

                var httpRequestD = new XMLHttpRequest();

                if (!httpRequestD) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                httpRequestD.onreadystatechange = getDecision;
                httpRequestD.open('POST', 'php/finishStaffRequest.php');
                httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]));

            }
        }
    }
}



function showSummary() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            var response = JSON.parse(this.responseText);

            document.getElementById('ModalLabel').innerHTML = "Approve or Reject the Processed Event Request";
            document.getElementById('ModalBody').innerHTML = "&nbsp&nbsp&nbsp&nbsp" + getEvent;
            document.getElementById('ModalBody2').innerHTML = "<b>Financial's Manager feedback: </b><p>" + response.feedback + "</p>";
            document.getElementById('FooterDefault').innerHTML = "Reject";
            document.getElementById('FooterSecond').innerHTML = "Approve";

            document.getElementById('FooterDefault').onclick = function() {
                getAMdecision = 'rejected';
                var httpRequestD = new XMLHttpRequest();

                if (!httpRequestD) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                httpRequestD.onreadystatechange = getDecision;
                httpRequestD.open('POST', 'php/amDecision.php');
                httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]) + '&decision=' + encodeURIComponent(getAMdecision));
            }

            document.getElementById('FooterSecond').onclick = function() {
                getAMdecision = 'accepted';
                var httpRequestD = new XMLHttpRequest();

                if (!httpRequestD) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                httpRequestD.onreadystatechange = getDecision;
                httpRequestD.open('POST', 'php/amDecision.php');
                httpRequestD.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                httpRequestD.send('idTask=' + encodeURIComponent(idTask[stands]) + '&decision=' + encodeURIComponent(getAMdecision));

            }

        }
    }
}

//window.onload = taskListRefresh;
window.onload = welcomeActor;