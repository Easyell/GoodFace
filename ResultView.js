/**
 * Created by guoshencheng on 7/9/15.
 */
//var Request = new Object();
//Request = GetRequest();
////var imageUrl = "http://v1.qzone.cc/avatar/201308/22/10/35/521578db0bf52972.jpg!200x200.jpg";
//var imageUrl = Request['imageUrl'];
//console.info(imageUrl);
var backgourndImage = document.getElementById("background-image");
var avatarImage = document.getElementById("avatar-image");
var shareButton = document.getElementById("share_button");
var startButton = document.getElementById("start_button");
var ruleButton = document.getElementById("rule_button");
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

backgourndImage.onload = function () {
    fixBackgroundPosition();
    configureStartButton();
    configureShareButton();
    configureRuleButton();
    //avatarImage.onload = function () {
    //    fixAvatarPosition();
    //}
    //avatarImage.src = imageUrl;
}
backgourndImage.src = "/result_view_background_image1.png";

function fixBackgroundPosition () {
    backgourndImage.style.left = (document.body.offsetWidth - backgourndImage.width ) / 2 + "px";
}

function fixAvatarPosition () {
    avatarImage.style.width = backgourndImage.offsetWidth * 0.25 + "px";
    avatarImage.style.height = backgourndImage.offsetWidth * 0.25 + "px";
    avatarImage.style.left = (document.body.offsetWidth - avatarImage.width ) / 2 + "px";
    avatarImage.style.top = backgourndImage.offsetTop + backgourndImage.offsetHeight * 0.2 + "px";
}

function configureShareButton () {
    shareButton.style.top = (790 / 1645) * backgourndImage.offsetHeight + "px";
    shareButton.style.width = (170 / 1645) * backgourndImage.offsetHeight + "px";
    shareButton.style.height = (35 / 1645) * backgourndImage.offsetHeight + "px";
    shareButton.style.left = (document.body.offsetWidth - shareButton.offsetWidth) / 2 + "px";
    shareButton.style.opacity = 1;
}

function configureStartButton () {
    startButton.style.top = (965 / 1645) * backgourndImage.offsetHeight + "px";
    startButton.style.width = (320 / 1645) * backgourndImage.offsetHeight + "px";
    startButton.style.height = (70 / 1645) * backgourndImage.offsetHeight + "px";
    startButton.style.left = (document.body.offsetWidth - startButton.offsetWidth) / 2 + "px";
    startButton.style.opacity = 1;
}

function configureRuleButton () {
    ruleButton.style.top = (1185 / 1645) * backgourndImage.offsetHeight + "px";
    ruleButton.style.width = (210 / 1645) * backgourndImage.offsetHeight + "px";
    ruleButton.style.height = (60 / 1645) * backgourndImage.offsetHeight + "px";
    ruleButton.style.left = (document.body.offsetWidth - ruleButton.offsetWidth) / 2 + "px";
    ruleButton.style.opacity = 1;
}

startButton.onclick = function () {
    window.location.href = "/TakePhotoView.html";
};

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

var cfg = {
    title: '雅顿数钱挑战 - 好礼等你来拿',
    link: 'http://ws.winchance870.com/weixin/arden/index.htm',
    imgUrl: 'http://ws.winchance870.com/img/share.jpg'
};
wx.onMenuShareTimeline(cfg);
wx.onMenuShareAppMessage(cfg);