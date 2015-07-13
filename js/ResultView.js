/**
 * Created by guoshencheng on 7/9/15.
 */
/**
*Url format
*http://localhost:8080/ResultView.html?backgroundId=4&imageUrl=url
 * background can be nil
 * if background is nil we get a random number for bakgroundImage
**/
var Request = new Object();
Request = GetRequest();
var imageUrl = Request['imageUrl'];
var backgroundId = Request['backgroundId'];
console.info(backgroundId);

//console.info(imageUrl);
var backgroundImageUrlsArray = ["img/result_view_background_image1.png",
                                "img/result_view_background_image2.png",
                                "img/result_view_background_image3.png",
                                "img/result_view_background_image4.png",
                                "img/result_view_background_image5.png",
                                "img/result_view_background_image6.png",
                                "img/result_view_background_image7.png"];
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
    configurAllContext();
}
if (backgroundId) {
    backgourndImage.src = backgroundImageUrlsArray[backgroundId];
} else {
    var randomId = Math.round(Math.random()*6);
    backgourndImage.src = backgroundImageUrlsArray[randomId];
    backgroundId = randomId;
}

function configurAllContext () {
    fixBackgroundPosition();
    configureStartButton();
    if (!backgroundId) {
        configureShareButton();
    }
    configureRuleButton();
    avatarImage.onload = function () {
        fixAvatarPosition();
    }
    avatarImage.src = imageUrl;
}

function fixBackgroundPosition () {
    backgourndImage.style.left = (document.body.offsetWidth - backgourndImage.width ) / 2 + "px";
}

function fixAvatarPosition () {
    avatarImage.style.width = backgourndImage.offsetHeight * (265 / 1645) + "px";
    avatarImage.style.height = backgourndImage.offsetHeight * (265 / 1645) + "px";
    avatarImage.style.left = (document.body.offsetWidth - avatarImage.width ) / 2 + "px";
    avatarImage.style.top = backgourndImage.offsetTop + backgourndImage.offsetHeight * (225 / 1645) + "px";
    console.info(avatarImage.offsetTop);
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

ruleButton.onclick = function () {
    window.location.href = "RuleView.html";
}

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
    title: '刷脸游戏 - 好礼等你来拿',
    link: 'http://ws.winchance870.com/weixin/arden/index.htm',//use url Format
    imgUrl: 'http://ws.winchance870.com/img/share.jpg'//use imageUrl
};
wx.onMenuShareTimeline(cfg);
wx.onMenuShareAppMessage(cfg);