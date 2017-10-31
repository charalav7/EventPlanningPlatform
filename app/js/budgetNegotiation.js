var e;
var idTask, reason, amount;
var myExecution;

function submitBudNeg() {

    var x = document.cookie.split('=');
    idTask = Number(x[1]);
    reason = document.getElementById('reason').value;
    amount = document.getElementById('amount').value;

    handleBN('php/createFinancialRequest.php');
}

function handleBN(url) {
	var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }

    httpRequest.onreadystatechange = getBNContents;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send('idTask=' + encodeURIComponent(idTask) +
    '&reason=' + encodeURIComponent(reason) +
    '&amount=' + encodeURIComponent(amount));
}

function getBNContents(){
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
