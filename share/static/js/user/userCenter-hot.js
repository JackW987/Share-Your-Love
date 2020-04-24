//占比
hotWorksProportion(getId());
//热门视频
hotVideos(getId())
function hotVideos(id) {
    axios({
        'url':'/api/video/user/'+id,
        'method':'get',
        'params':{
            'sort':'likeCount'
        }
    }).then(function (res) {
        const videos = res.data.videos;
        const totalElements = res.data.totalElements;
        const totalPages = res.data.totalPages;
        for (let index=0;index<videos.length;index++) {
            let video = videos[index];
            let v = {
                "videoId": video.videoId,
                "user": {
                    "id": video.user.id,
                    "nickname": video.user.nickname,
                    "headUrl": video.user.headUrl
                },
                "imgUrl": video.imgUrl,
                "tag": video.tag,
                "title": video.title,
                "introduction": video.introduction,
                "playCount": video.playCount,
                "likeCount": video.likeCount,
                "smallTags": video.smallTags,
                "createDate": video.createDate
            };

            $(".plate-section-video:eq(0) .plate-section-list").append("<li data-id="+v.videoId+">\n" +
                "<div class=\"video-banner-item\">\n" +
                "<div class=\"player\">\n" +
                "<div class=\"img-con\">\n" +
                "</div>\n" +
                "<div class=\"mask\">\n" +
                "<i href=\"javascirpt:void(0);\" class=\"glyphicon glyphicon-play-circle\">\n" +
                "</i>\n" +
                "</div>\n" +
                "</div>\n" +
                "<span class=\"text\">\n" +
                "<div class=\"top-text\">\n" +
                v.title+
                "</div>\n" +
                "<div class=\"bottom-text\">\n" +
                "<img src="+v.user.headUrl+" alt=\"item-1\">\n" +
                "<div class=\"author-name\">\n" +
                v.user.nickname+
                "</div>\n" +
                "<div class=\"hot-tag\">\n" +
                "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                parseInt(v.likeCount/1000)+"k"+
                "</div>\n" +
                "<div class=\"playback-tag\">\n" +
                "<i class=\"glyphicon glyphicon-facetime-video\"></i>\n" +
                parseInt(v.playCount/1000)+"k"+
                "</div>\n" +
                "</div>\n" +
                "</span>\n" +
                "</div>\n" +
                "</li>");
            $('.plate-section-video:eq(0) .img-con:eq('+index+') ').css("background-image","url(" + v.imgUrl + ")")
        }
    })
}

hotBlog(getId());
function hotBlog(id) {
    axios({
        'url':"/api/articles/user/"+id,
        'method':'get',
        'params':{
            'page':0,
            'size':6,
            'sort':'likeCount'
        }
    }).then(function (res) {
        const blogs = res.data.objectList;
        const totalElements = res.data.totalElements;
        const totalPages = res.data.totalPages;
        for (let index=0;index<blogs.length;index++){
            let blog = blogs[index]
            let article = {
                "id": blog.id,
                "user": {
                    "id": blog.user.id,
                    "nickname": blog.user.nickname,
                    "headUrl": blog.user.headUrl
                },
                "tag": blog.tag,
                "bgImg":blog.bgImg,
                "title": blog.title,
                "text": blog.text,
                "readCount": blog.readCount,
                "likeCount": blog.likeCount,
                "smallTags": blog.smallTags,
                "createDate": blog.createDate
            };

            const smallTags = [];
            for (let index=0;index<article.smallTags.length;index++){
                smallTags[index] = article.smallTags[index].smallTag;
            }

            $(".plate-section-video:eq(1) .plate-section-list").append("<li data-id="+article.id+">\n" +
                "<a href=\"javascript:void(0);\" class=\"plate-remove-btn\"></a>\n" +
                "<div class=\"video-banner-item\">\n" +
                "<div class=\"player blog-box\">\n" +
                "<div class=\"blog-img-con\"></div>" +
                "<div class=\"text-mask-banner\"><span class=\"mask-top-text\"><b>\n" +
                smallTags.toString() +
                "</b></span><span class=\"mask-bottom-text\">\n" +
                removeHTMLTag(article.text) +
                "</span></div></div>\n" +
                "<span class=\"text\">\n" +
                "<div class=\"top-text\" onclick=\"window.location.href='url'\">\n" +
                article.title +
                "</div>" +
                "<div class=\"bottom-text\">\n" +
                "<img src="+blog.user.headUrl+" alt=\"item-1\">\n" +
                "<div class=\"author-name\">\n" +
                article.user.nickname +
                "</div>" +
                "<div class=\"hot-tag\">\n" +
                "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                parseInt(article.likeCount/1000)+"k"+
                "</div>"+
                "<div class=\"playback-tag\">\n" +
                "<i class=\"glyphicon glyphicon-eye-open\"></i>\n" +
                parseInt(article.readCount/1000) +"k"+
                "</div></div></span></div></li>");
            $('.plate-section-list .blog-img-con:eq('+index+') ').css("background-image","url(" + article.bgImg + ")")
        }
    })
}
if (cookie!=null){
    if (JSON.parse(localStorage.user).id!=getId()){
        disable();
    }
} else {
    disable();
}
//更新公告
$(".plate-list-content textarea").change(function () {
    updateAnnouncement($(this).val());
});
function updateAnnouncement(text) {
    let formData = new FormData();
    formData.append('announcement',text);
    axios({
        'url':'/api/user/announcement',
        'method':'post',
        'data':formData
    }).then(function (res) {
        $(".word-count").text(text.length+"/150")
    })
}


//用户信息
userInfo(getId())
function userInfo(id) {
    axios({
        'url':'/api/user/info/'+id,
        'method':'get'
    }).then(function (res) {
        if (res.data.userInfo.announcement!=null){
            $(".plate-list-content textarea").text(res.data.userInfo.announcement)
            $(".word-count").html(res.data.userInfo.announcement.length+"/150")
        }else {
            $(".plate-list-content textarea").text("暂无公告")
        }
        $(".hot-user-info li:eq(0) span:eq(0)").html("<img src=\"/static/images/userCenter/icon/mail.png\" alt=\"mail\">\n" +
            res.data.username);
        $(".hot-user-info li:eq(0) span:eq(1)").html("<img src=\"/static/images/userCenter/icon/clock.png\" alt=\"clock\">"+
        res.data.date);
        if (res.data.userInfo.birthday!=null){
            $(".hot-user-info li:eq(1) span:eq(0)").html("<img src=\"/static/images/userCenter/icon/birthday.png\" alt=\"mail\">"+
                res.data.userInfo.birthday)
        }else {
            $(".hot-user-info li:eq(1) span:eq(0)").html("<img src=\"/static/images/userCenter/icon/birthday.png\" alt=\"mail\">"+
                "未知")
        }

    });
    axios({
        'url':'/api/user/hot/'+JSON.parse(localStorage.user).id,
        'method':'get'
    }).then(function (res) {
        $(".hot-user-info li:eq(1) span:eq(1)").html("<img src=\"/static/images/userCenter/icon/fire-small.png\" alt=\"clock\">"+
            parseFloat(res/1000).toFixed(1)+"k")
    })
}
//点击跳转事件
$(document).on('click','.plate-section-video:eq(0) .top-text',function () {
    location.href="/videos/"+($(this).parent().parent().parent().data('id'));
});
$(document).on('click','.mask',function () {
    location.href="/videos/"+($(this).parent().parent().parent().data('id'));
});
$(document).on('click','.plate-section-video:eq(1) .top-text',function () {
    location.href="/articles/"+($(this).parent().parent().parent().data('id'));
});
$(document).on('click','.blog-img-con',function () {
    location.href="/articles/"+($(this).parent().parent().parent().data('id'));
});
$(".plate-hot-more-btn:eq(0)").attr('href','/userCenter-videos/'+getId());
$(".plate-hot-more-btn:eq(1)").attr('href','/userCenter-articles/'+getId());

function disable() {
    $(".plate-title-tag:eq(0)").html("ta的热门视频");
    $(".plate-title-tag:eq(1)").html("ta的热门博文");
    $(".plate-list-content textarea").attr('disabled','values');
}