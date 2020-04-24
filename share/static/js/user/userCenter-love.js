//占比
loveProportion(JSON.parse(localStorage.user).id);
//点赞的视频
videosLike(0,10);
function videosLike(page,size) {
    axios({
        'url':'/api/video/userLike/'+JSON.parse(localStorage.user).id,
        'method':'get',
        'params':{
            'page':page,
            'size':size
        }
    }).then(function (res) {
        const videos = res.data.videos;
        for (let index=0;index<videos.length;index++){
            let video = videos[index];
            let v = {
                "videoId": video.videoId,
                "user": {
                    "id": video.user.id,
                    "nickname": video.user.nickname,
                    "headUrl": video.user.headUrl
                },
                "imgUrl":video.imgUrl,
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
                parseFloat(v.likeCount/1000).toFixed(1)+"k"+
                "</div>\n" +
                "<div class=\"playback-tag\">\n" +
                "<i class=\"glyphicon glyphicon-facetime-video\"></i>\n" +
                parseFloat(v.playCount/1000).toFixed(1)+"k"+
                "</div>\n" +
                "</div>\n" +
                "</span>\n" +
                "</div>\n" +
                "</li>");
            $('.plate-section-list .img-con:eq('+index+') ').css("background-image","url(" + v.imgUrl + ")")
        }
    })
}
//点赞的文章
blogsLike(0,10);
function blogsLike(page,size) {
    axios({
        'url':'/api/articles/userLike/'+JSON.parse(localStorage.user).id,
        'method':'get',
        'params':{
            'page':page,
            'size':size
        }
    }).then(function (res) {
        const blogs = res.data.objectList;
        const totalElements = res.data.totalElements;
        const totalPages = res.data.totalPages;
        $(".plate-section-video:eq(1) .plate-title-work-count").html(totalElements+"<span class=\"work-count-decoration\"/>");
        for (let index=0;index<blogs.length;index++){
            let blog = blogs[index];
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
            let smallTags = [];
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
                "<div class=\"top-text\">\n" +
                article.title +
                "</div>" +
                "<div class=\"bottom-text\">\n" +
                "<img src="+blog.user.headUrl+" alt=\"item-1\">\n" +
                "<div class=\"author-name\">\n" +
                article.user.nickname +
                "</div>" +
                "<div class=\"hot-tag\">\n" +
                "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                parseFloat(article.likeCount/1000).toFixed(1)+"k"+
                "</div>"+
                "<div class=\"playback-tag\">\n" +
                "<i class=\"glyphicon glyphicon-eye-open\"></i>\n" +
                parseFloat(article.readCount/1000).toFixed(1) +"k"+
                "</div></div></span></div></li>");
            $('.plate-section-list .blog-img-con:eq('+index+') ').css("background-image","url(" + article.bgImg + ")")
        }
    })
}
//点赞作者
author();
function author() {
    axios({
        'url':'/api/user/likeUsers/'+JSON.parse(localStorage.user).id,
        'method':'get',
    }).then(function (res) {
        const userList = res.data;
        for (let index=0;index<userList.length;index++){

            let user = {
                "id": userList[index].id,
                "nickname": userList[index].nickname,
                "headUrl": userList[index].headUrl,
                "signature": userList[index].signature,
                "hot": userList[index].hot
            };
            $(".userCenter-love-list ul").append("<li data-id="+user.id+">\n" +
                "<img src="+user.headUrl+" alt=head-1>\n" +
                "<div>\n" +
                "<span class=\"first-mark\">\n" +
                user.nickname +
                "</span>\n" +
                "<span class=\"first-mark\">\n" +
                "<div class=\"field\">\n" +
                user.signature +
                "</div>\n" +
                "<div class=\"heat\">\n" +
                "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                parseFloat(user.hot/1000).toFixed(1) + "k"+
                "</div>\n" +
                "</span>\n" +
                "</div>\n" +
                "</li>")
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
//点击事件
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
$(document).on('click','.first-mark',function () {
    location.href="/userCenter-hot/"+($(this).parent().parent().data('id'));
});

function disable() {
    $(".plate-title-tag:eq(0)").html("ta喜欢的视频");
    $(".plate-title-tag:eq(1)").html("ta喜欢的博文");
    $(".plate-list-small-title").html("ta点赞的作者");
}