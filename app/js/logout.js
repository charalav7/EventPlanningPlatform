window.onload = getout;

function getout() {
    var i = sessionStorage.length;
    while (i--) {
        var key = sessionStorage.key(i);
        sessionStorage.removeItem(key);
    }

    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++)
        eraseCookie(cookies[i].split("=")[0]);

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }
    
    window.location = "index.html";
}