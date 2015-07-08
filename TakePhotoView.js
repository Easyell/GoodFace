/**
 * Created by guoshencheng on 7/7/15.
 */

// Request animation frame shim
window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback, element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var cropView = document.getElementById("crop-view");
var canvas = document.getElementById("canvas");
var uploadPhotoBtn = document.getElementById("upload-button");
var realUploadBtn = document.getElementById("real-upload-button");
var confirmBtn = document.getElementById("confirm-button");
var reuploadBtn = document.getElementById("reUpload-button");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var uploadPhoto;
var ctx = canvas.getContext('2d')
var uploadPhotoX = 0;
var uploadPhotoY = 0;
var canvasX = getLeft(cropView);
var canvasY = getTop(cropView);
var ratio = 1;
var addEvent = (function () {
    if (document.addEventListener) {
        return function (el, type, fn) {
            if (el && el.nodeName || el === window) {
                el.addEventListener(type, fn, false);
            } else if (el && el.length) {
                for (var i = 0; i < el.length; i++) {
                    addEvent(el[i], type, fn);
                }
            }
        };
    } else {
        return function (el, type, fn) {
            if (el && el.nodeName || el === window) {
                el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
            } else if (el && el.length) {
                for (var i = 0; i < el.length; i++) {
                    addEvent(el[i], type, fn);
                }
            }
        };
    }
})();
var loadUpLoadImage = function loadImage() {
    var file = realUploadBtn.files[0];
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function(fe){
        var result = this.result;
        uploadPhoto = new Image();
        uploadPhoto.onload = function() {
            caculateDefaultRatio();
            drawUpLoadPhoto();
        };
        uploadPhoto.src = result;
        uploadPhotoBtn.style.display = 'none';
        realUploadBtn.style.display = 'none';
    };
}

function caculateDefaultRatio() {
    if(uploadPhoto.width > uploadPhoto.height) {
        ratio = canvasWidth / uploadPhoto.width;
    } else {
        ratio = canvasHeight / uploadPhoto.height;
    }
}

//获取元素的纵坐标
function getTop(e){
    var offset=e.offsetTop;
    if(e.offsetParent!=null) {
        return offset + getTop(e.offsetParent);
    }
    return offset;
}
//获取元素的横坐标
function getLeft(e){
    var offset=e.offsetLeft;
    if(e.offsetParent!=null) {
        return offset + getLeft(e.offsetParent);
    } else {
        return offset;
    }
}

function drawUpLoadPhoto() {
    ctx.save();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //ctx.drawImage(uploadPhoto, uploadPhotoX, uploadPhotoY);
    ctx.scale(ratio, ratio);
    //ctx.translate(uploadPhotoX / ratio + uploadPhoto.width / 2, uploadPhotoY / ratio + uploadPhoto.height / 2);
    //ctx.rotate( (Math.PI / 180) * rotateDegree);
    //ctx.translate(-(uploadPhotoX / ratio + uploadPhoto.width / 2), -(uploadPhotoY / ratio + uploadPhoto.height / 2));
    ctx.drawImage(uploadPhoto, uploadPhotoX / ratio, uploadPhotoY / ratio);
    ////console.info(touch);
    ctx.restore();
}

function move(touch) {
    uploadPhotoX = (touch.pageX - canvasX - uploadPhoto.width  / 2) * canvasWidth / canvas.offsetWidth;
    uploadPhotoY = (touch.pageY - canvasY - uploadPhoto.height / 2) * canvasHeight / canvas.offsetHeight;
    drawUpLoadPhoto();
}

addEvent(cropView, 'touchmove', function(e) {
    e.preventDefault();
    var touches = e.changedTouches;
    if(touches && touches.length == 1) {
        requestAnimFrame(function() {
            move(touches[0]);
        });
    }
});
