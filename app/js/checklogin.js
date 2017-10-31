window.onload = isActorInside;

function isActorInside(){
	if (sessionStorage.actor){
		document.getElementById("isActorOn").innerHTML = sessionStorage.actor;
		document.getElementById("isActorOn").style.display = 'block';
		document.getElementById("islogin").innerHTML = "Logout";
		document.getElementById("islogin").href = "logout.html"
		if (sessionStorage.actor != "sarah"){
			document.getElementById("isTaskOn").innerHTML = "Tasklist"
			document.getElementById("isTaskOn").style.display = 'block';
			document.getElementById("isTaskOn").href = "tasklist.html";
		} else if (sessionStorage.actor == "sarah") {
			document.getElementById("isTaskOn").innerHTML = "New Event Request";
			document.getElementById("isTaskOn").style.display = 'block';
			document.getElementById("isTaskOn").href = "cso.html";
		}
	} else {
		document.getElementById("islogin").innerHTML = "Login";
	}
}