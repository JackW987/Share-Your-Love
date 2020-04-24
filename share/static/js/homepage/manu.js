//视频
passVideos(0);
function passVideos(page){
    axios({
        'url':'/api/video/me',
        'params':{
            'page':page,
            'size':10,
        }
    }).then(function (res) {
        $(".already-passed-video-btn").html("已通过("+res.data.videos.length+")");
        getVideoResult(res,".already-passed-video")
    })
}
passingVideos(0);
function passingVideos(page){
    axios({
        'url':'/api/video/me',
        'params':{
            'page':page,
            'size':10,
            'isAuditing':false
        }
    }).then(function (res) {
        $(".auditing-video-btn").html("审核中("+res.data.videos.length+")");
        getVideoResult(res,".auditing-video")
    })
}
noPassVideos(0);
function noPassVideos(page) {
    axios({
        'url':'/api/video/me',
        'params':{
            'page':page,
            'size':10,
            'enable':false
        }
    }).then(function (res) {
        $(".not-through-video-btn").html("未通过("+res.data.videos.length+")");
        $(".not-through-video div").remove();
        for (let index=0;index<res.data.videos.length;index++){
            let video = res.data.videos[index];
            $(".not-through-video").append("<div class=\"plate-work-container\">\n" +
                "<div class=\"plate-work-img\">\n" +
                "<img src="+video.imgUrl+" alt=\"Harden.jpg\">\n" +
                "<div class=\"video-duration\">"+timeCount(video.time)+"</div>\n" +
                "</div>\n" +
                "<div class=\"plate-work-info-container\">\n" +
                "<div class=\"plate-work-info-title\">\n" +
                "<span>\n" +
                video.tag +
                "</span>\n" +
                "<a href=\"javascript:void(0)\">\n" +
                video.title +
                "</a>\n" +
                "</div>\n" +
                "<span class=\"plate-work-info-time\">\n" +
                video.createDate +
                "</span>\n" +
                "<ul class=\"plate-work-info-footer\">\n" +
                "<li>\n" +
                "<i class=\"glyphicon glyphicon-facetime-video\"></i>\n" +
                video.playCount +
                "</li>\n" +
                "<li>\n" +
                "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                video.likeCount +
                "</li>\n" +
                "<li>\n" +
                "<i class=\"glyphicon glyphicon-comment\"></i>\n" +
                video.commentNum +
                "</li>\n" +
                "</ul>\n" +
                "</div>\n" +
                "<div class=\"operate-view\">\n" +
                "<a data-id="+video.videoId+" href=\"javascript:void(0);\" class=\"remove-work-btn\">\n" +
                "<i class=\"glyphicon glyphicon-remove\"></i>\n" +
                "</a>\n" +
                "<a data-id="+video.videoId+" data-type=video href=\"javascript:void(0)\" class=\"problem-show-btn edit-work-btn\">\n" +
                "问题\n" +
                "</a>\n" +
                "</div>\n" +
                "</div>")
        }
    })
}
function getVideoResult(res,cs){
    $(cs+" div").remove();
    for (let index=0;index<res.data.videos.length;index++){
        let video = res.data.videos[index];
        $(cs).append(" <div class=\"plate-work-container\">\n" +
            "<div class=\"plate-work-img\">\n" +
            "<img src="+video.imgUrl+" alt=\"Harden.jpg\">\n" +
            "<div class=\"video-duration\">"+timeCount(video.time)+"</div>\n" +
            "</div>\n" +
            "<div class=\"plate-work-info-container\">\n" +
            "<div class=\"plate-work-info-title\">\n" +
            "<span>\n" +
            video.tag +
            "</span>\n" +
            "<a href=/videos/"+video.videoId+">\n" +
            video.title +
            "</a>\n" +
            "</div>\n" +
            "<span class=\"plate-work-info-time\">\n" +
            video.createDate +
            "</span>\n" +
            "<ul class=\"plate-work-info-footer\">\n" +
            "<li>\n" +
            "<i class=\"glyphicon glyphicon-facetime-video\"></i>\n" +
            video.playCount +
            "</li>\n" +
            "<li>\n" +
            "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
            video.likeCount +
            "</li>\n" +
            "<li>\n" +
            "<i class=\"glyphicon glyphicon-comment\"></i>\n" +
            video.commentNum +
            "</li>\n" +
            "</ul>\n" +
            "</div>\n" +
            "<div class=\"operate-view\">\n" +
            "<a data-id="+video.videoId+" data-type=video href=\"javascript:void(0);\" class=\"remove-work-btn\">\n" +
            "<i class=\"glyphicon glyphicon-remove\"></i>\n" +
            "</a>\n" +
            "<a href=\"javascript:void(0)\" class=\"edit-work-btn\">\n" +
            "编辑\n" +
            "</a>\n" +
            "</div>\n" +
            "</div>")
    }
}
//图文
passArticles(0);
function passArticles(page) {
    axios({
        'url':'/api/articles/me',
        'params':{
            'page':page,
            'size':10,
            'enable':true
        }
    }).then(function (res) {
        $(".imgTxt-title-work-nav .already-passed-imgTxt-btn").html("已通过("+res.data.objectList.length+")");
        $(".manu-imgTxt-container .already-passed div").remove();
        for (let index=0;index<res.data.objectList.length;index++){
            let article = res.data.objectList[index];
            $(".manu-imgTxt-container .already-passed").append("<div class=\"plate-work-container\">\n" +
                "<div class=\"plate-work-img\">\n" +
                "<img src="+article.bgImg+" alt=\"Harden.jpg\">\n" +
                "</div>\n" +
                "<div class=\"plate-work-info-container\">\n" +
                "<div class=\"plate-work-info-title\">\n" +
                "<span>\n" +
                article.tag +
                "</span>\n" +
                "<a href=/articles/"+article.id+">\n" +
                article.title +
                "</a>\n" +
                "</div>\n" +
                "<span class=\"plate-work-info-time\">\n" +
                article.createDate +
                "</span>\n" +
                "<ul class=\"plate-work-info-footer\">\n" +
                "<li>\n" +
                "<i class=\"glyphicon glyphicon-facetime-video\"></i>\n" +
                article.readCount +
                "</li>\n" +
                "<li>\n" +
                "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                article.likeCount +
                "</li>\n" +
                "<li>\n" +
                "<i class=\"glyphicon glyphicon-comment\"></i>\n" +
                article.commentNum+
                "</li>\n" +
                "</ul>\n" +
                "</div>\n" +
                "<div class=\"operate-view\">\n" +
                "<a data-id="+article.id+" data-type=article href=\"javascript:void(0);\" class=\"remove-work-btn\">\n" +
                "<i class=\"glyphicon glyphicon-remove\"></i>\n" +
                "</a>\n" +
                "<a href=\"javascript:void(0)\" class=\"edit-work-btn\">\n" +
                "编辑\n" +
                "</a>\n" +
                "</div>\n" +
                "</div>")
        }
    })
}
notPassArticles(0);
function notPassArticles(page) {
    axios({
        'url':'/api/articles/me',
        'params':{
            'page':page,
            'size':10,
            'enable':false
        }
    }).then(function (res) {
        $(".imgTxt-title-work-nav .rescinded-btn").html("已撤销("+res.data.objectList.length+")");
        $(".manu-imgTxt-container .rescinded div").remove();
        for (let index=0;index<res.data.objectList.length;index++){
            let article = res.data.objectList[index];
            $(".manu-imgTxt-container .rescinded").append("<div class=\"plate-work-container\">\n" +
                "<div class=\"plate-work-img\">\n" +
                "<img src="+article.bgImg+" alt=\"Harden.jpg\">\n" +
                "</div>\n" +
                "<div class=\"plate-work-info-container\">\n" +
                "<div class=\"plate-work-info-title\">\n" +
                "<span>\n" +
                article.tag +
                "</span>\n" +
                "<a href=\"javascript:void(0)\">\n" +
                article.title +
                "</a>\n" +
                "</div>\n" +
                "<span class=\"plate-work-info-time\">\n" +
                article.createDate +
                "</span>\n" +
                "<ul class=\"plate-work-info-footer\">\n" +
                "<li>\n" +
                "<i class=\"glyphicon glyphicon-facetime-video\"></i>\n" +
                article.readCount +
                "</li>\n" +
                "<li>\n" +
                "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                article.likeCount +
                "</li>\n" +
                "<li>\n" +
                "<i class=\"glyphicon glyphicon-comment\"></i>\n" +
                article.commentNum +
                "</li>\n" +
                "</ul>\n" +
                "</div>\n" +
                " <div class=\"operate-view\">\n" +
                "<a data-id="+article.id+" data-type=article href=\"javascript:void(0);\" class=\"remove-work-btn\">\n" +
                "<i class=\"glyphicon glyphicon-remove\"></i>\n" +
                "</a>\n" +
                "<a data-id="+article.id+" data-type=article  href=\"javascript:void(0)\" class=\"problem-show-btn edit-work-btn\">\n" +
                "问题\n" +
                "</a>\n" +
                "</div>"+
                "</div>")
        }
    })
}

function articleProblems(id) {
    axios.get('/api/articles/problems/'+id).then(function (res) {
        problemsResult(res)
    })
}

function videoProblems(id) {
    axios.get('/api/video/problems/'+id).then(function (res) {
        problemsResult(res)
    })
}

function problemsResult(res) {
    $(".problemModal-text").html("稿件中存在"+res.data.length+"个问题");
    $(".problemModal-list li").remove();
    for (let index=0;index<res.data.length;index++){
        $(".problemModal-list").append("<li>\n" +
            "<span class=\"dot\"></span>\n" +
            res.data[index] +
            "</li>")
    }
}

//未登录无法访问
let cookie = getCookie('Bearer');
if (cookie==null){
    location.href = '/';
}