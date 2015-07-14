/** * Created by guoshencheng on 7/7/15. */// Request animation frame shimwindow.requestAnimFrame = (function() {    return  window.requestAnimationFrame       ||        window.webkitRequestAnimationFrame ||        window.mozRequestAnimationFrame    ||        window.oRequestAnimationFrame      ||        window.msRequestAnimationFrame     ||        function(callback, element){            window.setTimeout(callback, 1000 / 60);        };})();var buttonArea = document.getElementById("button-area");var backgroundImage = document.getElementById('wx_face_function_background');var maskImage = document.getElementById("mask_image");var zoomControl = document.getElementById("zoom-control");var dragable = document.getElementById("dragable");var line = document.getElementById("line");var containerDiv = document.getElementById("container-div");var cropView = document.getElementById("crop-view");var canvas = document.getElementById("canvas");var uploadPhotoBtn = document.getElementById("upload-button");var realUploadBtn = document.getElementById("real-upload-button");var realreUploadBtn = document.getElementById("real-reUpload-button");var confirmBtn = document.getElementById("confirm-button");canvas.height = canvas.width;var canvasWidth = canvas.width;var canvasHeight = canvas.height;var uploadPhoto;var ctx = canvas.getContext('2d')var uploadPhotoX = 0;var uploadPhotoY = 0;var canvasX = getLeft(cropView);var canvasY = getTop(cropView);var lineX = getLeft(line);var ratio = 1;var zoom = 1;var imgRotation = 0;var moveStartX = 0;var moveStartY = 0;var uploadPhotoStarX = 0;var uploadPhotoStarY = 0;var viewport = document.querySelector("meta[name=viewport]");var winWidths= window.innerWidth;var densityDpi=640/winWidths;densityDpi= densityDpi>1?300*640*densityDpi/640:densityDpi;if(isWeixin()){    viewport.setAttribute('content', 'width=640, target-densityDpi='+densityDpi);}else{    viewport.setAttribute('content', 'width=640, user-scalable=no');    window.setTimeout(function(){        viewport.setAttribute('content', 'width=640, user-scalable=yes');    },1000);}function isWeixin(){    var ua = navigator.userAgent.toLowerCase();    if(ua.match(/MicroMessenger/i)=="micromessenger") {        return true;    } else {        return false;    }}backgroundImage.onload = function() {    configureContainerView();    configureCropView();    configureZoomControl();    configureButtonArea();}backgroundImage.src = "img/wxFaceFunctionBackground.png";var addEvent = (function () {    if (document.addEventListener) {        return function (el, type, fn) {            if (el && el.nodeName || el === window) {                el.addEventListener(type, fn, false);            } else if (el && el.length) {                for (var i = 0; i < el.length; i++) {                    addEvent(el[i], type, fn);                }            }        };    } else {        return function (el, type, fn) {            if (el && el.nodeName || el === window) {                el.attachEvent('on' + type, function () { return fn.call(el, window.event); });            } else if (el && el.length) {                for (var i = 0; i < el.length; i++) {                    addEvent(el[i], type, fn);                }            }        };    }})();var loadUpLoadImage = function loadImage() {    var file = realUploadBtn.files[0];    EXIF.getData(file, function() {        imgRotation = 0;        var orientation = EXIF.getTag(this, 'Orientation');        switch(orientation) {            case 3:                imgRotation = 180;                break;            case 6:                imgRotation = 90;                break;            case 8:                imgRotation = 270;                break;        }    });    var fr = new FileReader();    fr.readAsDataURL(file);    fr.onload = function(fe){        var result = this.result;        uploadPhoto = new Image();        uploadPhoto.onload = function() {            caculateDefault();            console.info(imgRotation);            drawUpLoadPhoto();        };        uploadPhoto.src = result;        maskImage.style.display = 'block';        uploadPhotoBtn.style.display = 'none';        realUploadBtn.style.display = 'none';    };}var reloadUpLoadImage = function loadImage() {    var file = realreUploadBtn.files[0];    EXIF.getData(file, function() {        imgRotation = 0;        var orientation = EXIF.getTag(this, 'Orientation');        switch(orientation) {            case 3:                imgRotation = 180;                break;            case 6:                imgRotation = 90;                break;            case 8:                imgRotation = 270;                break;        }    });    var fr = new FileReader();    fr.readAsDataURL(file);    fr.onload = function(fe){        var result = this.result;        uploadPhoto = new Image();        uploadPhoto.onload = function() {            caculateDefault();            console.info(imgRotation);            drawUpLoadPhoto();        };        uploadPhoto.src = result;        maskImage.style.display = 'block';        uploadPhotoBtn.style.display = 'none';        realUploadBtn.style.display = 'none';    };}function configureContainerView() {    containerDiv.style.top = backgroundImage.offsetTop + "px";    containerDiv.style.left = backgroundImage.offsetLeft + "px";    containerDiv.style.height = backgroundImage.offsetHeight + "px";    containerDiv.style.width = backgroundImage.offsetWidth + "px";    containerDiv.style.opacity = 1;}function configureCropView () {    cropView.style.top = (263 / 960) * backgroundImage.offsetHeight + "px";    cropView.style.height = (280 / 960) * backgroundImage.offsetHeight + "px";    cropView.style.width = (280 / 960) * backgroundImage.offsetHeight + "px";    cropView.style.left = (containerDiv.offsetWidth - cropView.offsetWidth) / 2 + "px";}function configureZoomControl () {    zoomControl.style.top = (600 / 960) * backgroundImage.offsetHeight + "px";    zoomControl.style.width = (250 / 960) * backgroundImage.offsetHeight + "px";    zoomControl.style.height = (40 / 960) *backgroundImage.offsetHeight + "px";    zoomControl.style.left = (backgroundImage.offsetWidth - zoomControl.offsetWidth) / 2 + "px";    line.style.top = (zoomControl.offsetHeight - line.offsetHeight) / 2 + "px";    dragable.style.top = (zoomControl.offsetHeight - dragable.offsetHeight) / 2 + "px";    lineX = getLeft(line);}function configureButtonArea () {    buttonArea.style.top = (710 / 960) * backgroundImage.offsetHeight + "px";    buttonArea.style.width = (335 / 960) * backgroundImage.offsetHeight + "px";    buttonArea.style.height = (60 / 960) * backgroundImage.offsetHeight + "px";    buttonArea.style.left = (backgroundImage.offsetWidth - buttonArea.offsetWidth) / 2 + "px";}function caculateDefault() {    if(uploadPhoto.width > uploadPhoto.height) {        ratio = canvasWidth / uploadPhoto.width;    } else {        ratio = canvasHeight / uploadPhoto.height;    }    center();}function center () {    uploadPhotoX = (canvasWidth - uploadPhoto.width * (ratio * zoom)) / 2;    uploadPhotoY = (canvasHeight - uploadPhoto.height * (ratio * zoom)) / 2;}//获取元素的纵坐标function getTop(e){    var offset=e.offsetTop;    if(e.offsetParent!=null) {        return offset + getTop(e.offsetParent);    }    return offset;}//获取元素的横坐标function getLeft(e){    var offset=e.offsetLeft;    if(e.offsetParent!=null) {        return offset + getLeft(e.offsetParent);    } else {        return offset;    }}function drawUpLoadPhoto() {    ctx.save();    ctx.clearRect(0, 0, canvasWidth, canvasHeight);    ctx.scale((ratio * zoom), (ratio * zoom));    ctx.translate(uploadPhotoX / (ratio * zoom) + uploadPhoto.width / 2, uploadPhotoY / (ratio * zoom) + uploadPhoto.height / 2);    ctx.rotate( (Math.PI / 180) * imgRotation);    ctx.translate(-(uploadPhotoX / (ratio * zoom) + uploadPhoto.width / 2), -(uploadPhotoY / (ratio * zoom) + uploadPhoto.height / 2));    ctx.drawImage(uploadPhoto, uploadPhotoX / (ratio * zoom), uploadPhotoY / (ratio * zoom));    ////console.info(touch);    ctx.restore();}function startmove(touch) {    moveStartX = touch.pageX;    moveStartY = touch.pageY;    uploadPhotoStarX = uploadPhotoX;    uploadPhotoStarY = uploadPhotoY;}function move(touch) {    uploadPhotoX = uploadPhotoStarX + (touch.pageX - moveStartX) * canvasWidth / canvas.offsetWidth;    uploadPhotoY = uploadPhotoStarY + (touch.pageY - moveStartY) * canvasHeight / canvas.offsetHeight;    //uploadPhotoX = (touch.pageX - canvasX) * canvasWidth / canvas.offsetWidth - uploadPhoto.width * (ratio * zoom)  / 2;    //uploadPhotoY = (touch.pageY - canvasY) * canvasHeight / canvas.offsetHeight - uploadPhoto.height * (ratio * zoom) / 2;    drawUpLoadPhoto();}function drag(touch) {    var dragX = touch.pageX - lineX;    console.info(dragX);    if (dragX >= line.offsetLeft && dragX <= line.offsetLeft + line.offsetWidth) {        console.info(dragX);        var lastZoom = zoom;        zoom = 1 + 0.8 * ((dragX - line.offsetLeft) / line.offsetWidth);        uploadPhotoX = uploadPhotoX - uploadPhoto.width * ratio * (zoom - lastZoom) / 2;        uploadPhotoY = uploadPhotoY - uploadPhoto.height * ratio * (zoom - lastZoom) / 2;        drawUpLoadPhoto();        dragable.style.left = dragX + "px";    }}var ajax = function (cfg) {    var type = cfg.type;    var url = cfg.url;    var data = cfg.data;    var success = cfg.success;    var xhr = new XMLHttpRequest();    xhr.onloadend = function () {        if (XMLHttpRequest.DONE == this.readyState && this.status == 200) {            var data = JSON.parse(xhr.responseText);            if (data.errMsg) {                alert(data.errMsg);            } else {                success(data);            }        } else {            alert('网络异常，请稍后再试。');        }    };    xhr.ontimeout = onerror;    xhr.open(type, url, true);    xhr.setRequestHeader('accept', 'application/json');    if (type.toUpperCase() == 'POST') {        xhr.setRequestHeader('contentType', 'application/json;charset=utf-8');        xhr.send(data);    } else {        xhr.send(null);    }};addEvent(cropView, 'touchmove', function(e) {    e.preventDefault();    var touches = e.changedTouches;    if(touches && touches.length == 1) {        requestAnimFrame(function() {            move(touches[0]);        });    }});addEvent(cropView,'touchstart', function(e) {    var touches = e.changedTouches;    if(touches && touches.length == 1) {        requestAnimFrame(function() {            startmove(touches[0]);        });    }});addEvent(zoomControl, 'touchmove', function(e) {    e.preventDefault();    var touches = e.changedTouches;    if(touches && touches.length == 1) {        requestAnimFrame(function() {           drag(touches[0]);        });    }});confirmBtn.onclick = function clickConfirm() {    console.info("confirm");    var data = canvas.toDataURL("image/png");    var  base64Data = data.substr(22)    var timestamp=new Date().getTime();    var entity = {        'version': '1.0',        'encoding': 'UTF-8',        'entity':{            'model':{                'userId':'1234567890',                'referTime':timestamp,                'imageString':base64Data            }        }    };    ajax({        type: 'POST',        url: '/goodface/api/images',        data: JSON.stringify(entity),        success: function (data) {            var imageUrl = data.entity.model.url;            console.info(imageUrl);            window.location.href = "ResultView.htm?"+"imageUrl="+imageUrl;        }    });}