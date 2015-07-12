var backgroundImage = document.getElementById("ruleBackground");
var returnButton = document.getElementById("rule_return");
var viewport = document.querySelector("meta[name=viewport]");
var winWidths= window.innerWidth;
var densityDpi=640/winWidths;
densityDpi= densityDpi>1?300*640*densityDpi/640:densityDpi;
if(isWeixin()){
    viewport.setAttribute('content', 'width=640, target-densityDpi='+densityDpi);
}else{
    viewport.setAttribute('content', 'width=640, user-scalable=no');
    window.setTimeout(function(){
        viewport.setAttribute('content', 'width=640, user-scalable=yes');
    },1000);
}
function isWeixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
backgroundImage.onload = function() {
	configureButtons();
}
backgroundImage.src = "img/rule.jpg";
function configureButtons () {
	returnButton.style.width = backgroundImage.offsetHeight * (40 / 960) + "px";
	returnButton.style.top = backgroundImage.offsetHeight * (100 / 960) + "px";
    returnButton.style.left = backgroundImage.offsetHeight * (530 / 960) + "px";
}
returnButton.onclick = function () {
    history.go(-1);
}