var medsTaken = null;
var user = null;
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var noBtn = document.getElementById("noBtn");
var yesBtn = document.getElementById("yesBtn");
var popupLoc;

function initFunc(loc, urlLink, newuserLink) {
    popupLoc = loc;
    dateurl = urlLink;
    newuser = newuserLink;
    main()
}

function loadCongrats() {
    var xhttp = new XMLHttpRequest(); /*ajax loaded after recording medicine*/
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("response").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("GET", popupLoc, true);
    xhttp.send();
}

function main() {
    var currentDate = new Date();
    
    if (localStorage.getItem('user') === null) { /* check if user exists*/
        user = false;
        medsTaken = false;
    } else {
        medDate = new Date(parseInt(localStorage.getItem('dateTaken')));
        millisecDiff = currentDate.getTime() - medDate.getTime();
        hourDiff = millisecDiff/parseFloat(3600*1000); /* converting milliseconds to hours*/
        if (hourDiff < 24.0) {
            document.getElementById("myBtn").style.display = "none";
            localStorage.setItem('medsTaken', 'True')
            loadCongrats();
        } else {
            localStorage.setItem('medsTaken', 'False');
            document.write("Thanks for coming back! Time to take your meds.") /*placeholder*/
            
            var uid = localStorage.getItem('uid');
            var milliseconds = currentDate.getTime();
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", dateurl + "?uid=" + String(uid) + "&dateTaken=" + String(milliseconds), true);
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                }
            };
            xhttp.send();
        }
    }
}

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

noBtn.onclick = function(event) {
    modal.style.display = "none";
}

yesBtn.onclick = function(event) {
    localStorage.setItem('user', 'True');
    localStorage.setItem('medsTaken', 'True');
    
    milliseconds = (new Date()).getTime();
    window.localStorage.setItem('dateTaken', String(milliseconds));
    var xhttp = new XMLHttpRequest();
            xhttp.open("GET", newuser + "?date=" + String(milliseconds), true);
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    localStorage.setItem('uid', parseInt(this.responseText));
                }
            };
            xhttp.send();
    
    loadCongrats();
    modal.style.display = "none";
    btn.style.display = "none";
}
