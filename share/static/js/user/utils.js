function getCookie(name)
{
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return str;
}


function changeFile(ele){
    var video = ele.files[0];
    var url = URL.createObjectURL(video);
    document.getElementById("aa").src = url;
}
function videoTime(ele) {
    localStorage.videoTime = parseInt(ele.duration);
}

function timeCount(s){
    var result;
    var min=Math.floor(s/60);
    var sec=s%60;
    if(min<10){
        result="0"+min+":";
    }
    else{
        result=min+":";
    }
    if(sec<10){
        result+="0"+sec
    }
    else{
        result+=sec;
    }
    return result;
}

function getId() {
    let url = window.location.href;
    let id = url.split('/')[url.split('/').length - 1];
    return id;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}