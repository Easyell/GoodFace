/**
 * Created by guoshencheng on 7/9/15.
 */
var Request = new Object();
Request = GetRequest();
console.info(Request);
//var imageUrl = "http://v1.qzone.cc/avatar/201308/22/10/35/521578db0bf52972.jpg!200x200.jpg";
var imageUrl = Request['imageUrl'];
var backgourndImage = document.getElementById("background-image");
var avatarImage = document.getElementById("avatar-image");
avatarImage.src = imageUrl;
fixBackgroundPosition();
fixAvatarPosition();
function fixBackgroundPosition () {
    backgourndImage.style.left = (document.body.offsetWidth - backgourndImage.width ) / 2 + "px";
}

function fixAvatarPosition () {
    avatarImage.style.width = backgourndImage.offsetWidth * 0.25 + "px";
    avatarImage.style.height = backgourndImage.offsetWidth * 0.25 + "px";
    avatarImage.style.left = (document.body.offsetWidth - avatarImage.width ) / 2 + "px";
    avatarImage.style.top = backgourndImage.offsetTop + backgourndImage.offsetHeight * 0.2 + "px";
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
    title: '雅顿数钱挑战 - 好礼等你来拿',
    link: 'http://ws.winchance870.com/weixin/arden/index.htm',
    imgUrl: 'http://ws.winchance870.com/img/share.jpg',
    success: function () {
        app.cookie('isShared', true, { expires: 365, path: '/' });
        cfg.callback();
    },
    callback: function () {}
};

app.onShare = function (v) {
    basejs.isString(v) && (cfg.title = v);
    basejs.isFunction(v) && (cfg.callback = v);
    wx.onMenuShareTimeline(cfg);
    wx.onMenuShareAppMessage(cfg);
};