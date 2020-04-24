// 热门标签  ?tag='tag'
let tag = getQueryString('tag');
if (tag=="足球"){
    $(".banner-top-bg").css("background","url(/static/images/banner-img/bg-messi.jpg)")
}else if (tag=="娱乐") {
    $(".banner-top-bg").css("background","url(/static/images/banner-img/bg-101.jpeg)")
}else if (tag=="电竞") {
    $(".banner-top-bg").css("background","url(/static/images/banner-img/bg-lol.jpg)")
}
axios.get('/api/smallTags',{
    'params':{
        'tag':getQueryString('tag')
    }
}).then(function (res) {
    for (let index=0; index<res.data.length;index++){
        $(".hot-tag-list").append("<li>\n" +
            "<a href=\"javascript:void(0);\">" +
            res.data[index].smallTag +
            "</a>\n" +
            "</li>");
    }
});
$(document).on('click','.hot-tag-list li',function () {
    if ($(this).index()!==0){
        $('.video-show-btn').data('smallTag',$(this).find("a").text());
        $('.imgTxt-show-btn').data('smallTag',$(this).find("a").text());
        $('.sort-nav li:eq(0)').data('smallTag',$(this).find("a").text());
        $('.sort-nav li:eq(1)').data('smallTag',$(this).find("a").text());
        getVideosBySmallTags(0,'createDate',$(this).find("a").text());
        getArticlesBySmallTags(0,'createDate',$(this).find("a").text())
    } else {
        $('.video-show-btn').data('smallTag',null);
        $('.imgTxt-show-btn').data('smallTag',null);
        videos(0,99,'createDate');
        articles(0,99,'createDate')
    }
});
//热门
axios.get('/api/tags/hot',{
    'params':{
        'tag':getQueryString('tag')
    }
}).then(function (res) {
    for (let index=0;index<res.data.length;index++){
        $(".hot-banner-list .rank-list").append("<li data-type="+res.data[index][2]+" data-id="+res.data[index][0]+" class=\"clearfix\">\n" +
            "<span class=\"mark\">\n" +
            (index+1) +
            "</span>\n" +
            "<img src="+res.data[index][3]+" alt=\"item-1\">\n" +
            "<p>"+res.data[index][1]+"</p>\n" +
            "</li>")
        if (index<3){
            $(".hot-banner-list .rank-list li").addClass('top-3');
            $(".hot-banner-list .rank-list li span").addClass('mark-top');
        }
    }

});
//热门模块点击事件
$(document).on('click','.rank-list li',function () {
    if ($(this).data('type')==="article"){
        location.href="/articles/"+$(this).data('id');
    }else {
        location.href="/videos/"+$(this).data('id');
    }
});

//最新动态 限制内容为视频
let newVideoPage = 0,totalPage=0;
newVideos(newVideoPage,'createDate');
function newVideos(page,size,sort) {
    axios.get('/api/video/tag',{
        'params': {
            "page": page,
            "size": 3,
            "sort": sort,
            "tag": getQueryString('tag')
        }
    }).then(function (res) {
        totalPage = res.data.totalPages;
        newVideoResult(res)
    });
}
//板块视频内容
videos(0,99,'createDate');
$(".video-show-btn").click(function () {
    if ($(this).data('smallTag')==null){
        videos(0,99,'createDate');
    }else {
        getVideosBySmallTags(0,'createDate',$(this).data('smallTag'))
    }

});
function videos(page,size,sort) {
    axios.get('/api/video/tag',{
        'params': {
            "page": page,
            "size": size,
            "sort": sort,
            "tag": getQueryString('tag')
        }
    }).then(function (res) {
        $('.sort-nav li').data('type','video');
        $(".banner-video-plate ul li").remove();
        for (let index=0;index<res.data.videos.length;index++){
            let video = res.data.videos[index];
            $(".banner-video-plate ul").append("<li data-id="+video.videoId+">\n" +
                "<div class=\"video-banner-item video-plate-fix\">\n" +
                "<div class=\"player\">\n" +
                "<div class=\"img-con\">\n" +
                "\n" +
                "</div>\n" +
                "<div class=\"mask\">\n" +
                "<i href=\"javascirpt:void(0);\" class=\"glyphicon glyphicon-play-circle\">\n" +
                "\n" +
                "</i>\n" +
                "</div>\n" +
                "</div>\n" +
                "<span class=\"text\">\n" +
                "<div class=\"top-text\">\n" +
                video.title +
                "</div>\n" +
                "<div class=\"bottom-text\">\n" +
                "<img src="+video.user.headUrl+" alt=\"item-1\">\n" +
                "<div class=\"author-name\">\n" +
                video.user.nickname +
                "</div>\n" +
                "<div class=\"hot-tag\">\n" +
                "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                parseFloat(video.likeCount/1000).toFixed(1) +"k"+
                "</div>\n" +
                "<div class=\"playback-tag\">\n" +
                "<i class=\"glyphicon glyphicon-facetime-video\"></i>\n" +
                parseFloat(video.playCount/1000).toFixed(1) +"k"+
                "</div>\n" +
                "</div>\n" +
                "</span>\n" +
                "</div>\n" +
                "</li>")
            $('.banner-video-plate ul .img-con:eq('+index+')').css('background','url('+video.imgUrl+')')
        }
    });
}
//板块文章内容
$(".imgTxt-show-btn").click(function () {
    if ($(this).data('smallTag')==null){
        articles(0,99,"createDate")
    }else {
        getArticlesBySmallTags(0,"createDate",$(this).data('smallTag'))
    }
});
function articles(page,size,sort){
    axios.get('/api/articles/tag',{
        'params':{
            "page":page,
            "size":size,
            "order": "desc",
            "sort": sort,
            "tag": getQueryString('tag')
        }
    }).then(function (res) {
        $('.sort-nav li').data('type','article');
        $(".banner-imgTxt-plate .img-txt-atlas li").remove();
        for (let index=0;index<res.data.objectList.length;index++){
            let article = res.data.objectList[index];
            $(".banner-imgTxt-plate .img-txt-atlas").append("<li>\n" +
                "<div class=\"img-txt-main-author clearfix\">\n" +
                "<a href=userCenter-hot/"+article.user.id+" class=\"img-txt-main-head\">\n" +
                "<img src="+article.user.headUrl+" alt=\"admin-1\">\n" +
                article.user.nickname +
                "</a>\n" +
                "</div>\n" +
                "<a href=articles/"+article.id+" class=\"img-txt-main-title\">\n" +
                article.title +
                "</a>\n" +
                "<div class=\"img-txt-main-txt\">\n" +
                removeHTMLTag(article.text)+
                "</div>\n" +
                "<div class=\"img-txt-main-img\"></div>\n" +
                "<div class=\"img-txt-main-bottom\">\n" +
                "<a href=homepage-banner.html?tag="+article.tag+" class=\"bottom-label\">\n" +
                article.tag +
                "</a>\n" +
                "<a href=\"javascript:void(0);\" class=\"bottom-click like\">\n" +
                "<i class=\"fa fa-heart\"></i>\n" +
                "<span>"+article.likeCount+"</span>\n" +
                "</a>\n" +
                "<a href=\"imgTxt-browse.html\" class=\"bottom-click\">\n" +
                "<i class=\"fa fa-comment\"></i>\n" +
                "<span>"+article.commentNum+"</span>\n" +
                "</a>\n" +
                "<a href=\"javascript:void(0);\" class=\"bottom-click\">\n" +
                "<i class=\"fa fa-share\"></i>\n" +
                "<span>"+article.readCount+"</span>\n" +
                "</a>\n" +
                "</div>\n" +
                "</li>")
            $(".img-txt-main-img:eq("+index+")").css("background","url("+article.bgImg+")")
            $('.img-txt-main-txt').each(function(){
                var max_width=170;
                if ($(this).text().length>max_width) {
                    $(this).text($(this).text().substring(0,max_width));
                    $(this).html($(this).html()+'...');
                }
            })
        }

    })
}
//换一批
$(".another-btn").click(function () {
    newVideoPage +=1;
    if (newVideoPage<totalPage){
        newVideos(newVideoPage,'createDate');
    }else {
        layer.msg("到底啦")
    }
});
//板块内容
function getArticlesBySmallTags(page,sort,smallTag) {
    axios('/api/articles/smallTag',{
        'params': {
            "page":page ,
            "size":10 ,
            "sort": sort,
            "smallTag": smallTag
        }
    }).then(function (res) {
        $('.sort-nav li').data('type','article');
        $(".banner-imgTxt-plate .img-txt-atlas li").remove();
        for (let index=0;index<res.data.objectList.length;index++){
            let article = res.data.objectList[index];
            $(".banner-imgTxt-plate .img-txt-atlas").append("<li>\n" +
                "<div class=\"img-txt-main-author clearfix\">\n" +
                "<a href=userCenter-hot/"+article.user.id+" class=\"img-txt-main-head\">\n" +
                "<img src="+article.user.headUrl+" alt=\"admin-1\">\n" +
                article.user.nickname +
                "</a>\n" +
                "</div>\n" +
                "<a href=articles/"+article.id+" class=\"img-txt-main-title\">\n" +
                article.title +
                "</a>\n" +
                "<div class=\"img-txt-main-txt\">\n" +
                removeHTMLTag(article.text)+
                "</div>\n" +
                "<div class=\"img-txt-main-img\"></div>\n" +
                "<div class=\"img-txt-main-bottom\">\n" +
                "<a href=homepage-banner.html?tag="+article.tag+" class=\"bottom-label\">\n" +
                article.tag +
                "</a>\n" +
                "<a href=\"javascript:void(0);\" class=\"bottom-click like\">\n" +
                "<i class=\"fa fa-heart\"></i>\n" +
                "<span>"+article.likeCount+"</span>\n" +
                "</a>\n" +
                "<a href=\"imgTxt-browse.html\" class=\"bottom-click\">\n" +
                "<i class=\"fa fa-comment\"></i>\n" +
                "<span>"+article.commentNum+"</span>\n" +
                "</a>\n" +
                "<a href=\"javascript:void(0);\" class=\"bottom-click\">\n" +
                "<i class=\"fa fa-share\"></i>\n" +
                "<span>"+article.readCount+"</span>\n" +
                "</a>\n" +
                "</div>\n" +
                "</li>")
            $(".img-txt-main-img:eq("+index+")").css("background","url("+article.bgImg+")")
            $('.img-txt-main-txt').each(function(){
                var max_width=170;
                if ($(this).text().length>max_width) {
                    $(this).text($(this).text().substring(0,max_width));
                    $(this).html($(this).html()+'...');
                }
            })
        }
    })
}

function getVideosBySmallTags(page,sort,smallTag) {
    axios.get('/api/video/smallTag',{
        'params': {
            "page":page ,
            "size":10 ,
            "sort": sort,
            "smallTag": smallTag
        }
    }).then(function (res) {
        $(".banner-video-plate ul li").remove();
        $('.sort-nav li').data('type','video');
        for (let index=0;index<res.data.videos.length;index++){
            let video = res.data.videos[index];
            $(".banner-video-plate ul").append("<li data-id="+video.videoId+">\n" +
                "<div class=\"video-banner-item video-plate-fix\">\n" +
                "<div class=\"player\">\n" +
                "<div class=\"img-con\">\n" +
                "\n" +
                "</div>\n" +
                "<div class=\"mask\">\n" +
                "<i href=\"javascirpt:void(0);\" class=\"glyphicon glyphicon-play-circle\">\n" +
                "\n" +
                "</i>\n" +
                "</div>\n" +
                "</div>\n" +
                "<span class=\"text\">\n" +
                "<div class=\"top-text\">\n" +
                video.title +
                "</div>\n" +
                "<div class=\"bottom-text\">\n" +
                "<img src="+video.user.headUrl+" alt=\"item-1\">\n" +
                "<div class=\"author-name\">\n" +
                video.user.nickname +
                "</div>\n" +
                "<div class=\"hot-tag\">\n" +
                "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                parseFloat(video.likeCount/1000).toFixed(1) +"k"+
                "</div>\n" +
                "<div class=\"playback-tag\">\n" +
                "<i class=\"glyphicon glyphicon-facetime-video\"></i>\n" +
                parseFloat(video.playCount/1000).toFixed(1) +"k"+
                "</div>\n" +
                "</div>\n" +
                "</span>\n" +
                "</div>\n" +
                "</li>");
            $('.banner-video-plate ul .img-con:eq('+index+')').css('background','url('+video.imgUrl+')')
        }
    })
}

//视频点击事件
$(document).on('click','.mask',function () {
    location.href="/videos/"+ $(this).parent().parent().parent().data('id');
});

// 最新 最热点击事件
$(".sort-nav li:eq(0)").click(function () {
    if ($(this).data('smallTag')==null){
        if ($(this).data('type')==='video'){
            videos(0, 99, 'createDate');
        }else {
            articles(0,99,'createDate')
        }
    }else {
        console.log("有标签")
        if ($(this).data('type')==='video'){
            getVideosBySmallTags(0,'createDate',$(this).data('smallTag'));
        }else {
            getArticlesBySmallTags(0,'createDate',$(this).data('smallTag'))
        }
    }

});
$(".sort-nav li:eq(1)").click(function () {
    console.log($(this).data('smallTag'))
    if ($(this).data('smallTag')==null){
        if ($(this).data('type')==='video'){
            videos(0, 99, 'likeCount');
        }else {
            articles(0,99,'likeCount')
        }
    }else {
        console.log("有标签")
        if ($(this).data('type')==='video'){
            getVideosBySmallTags(0,'likeCount',$(this).data('smallTag'));
        }else {
            getArticlesBySmallTags(0,'likeCount',$(this).data('smallTag'))
        }
    }
});

function newVideoResult(res) {
    $(".banner-content-new .content-new-list li").remove();
    for (let index=0;index<res.data.videos.length;index++){
        let video = res.data.videos[index];
        $(".banner-content-new .content-new-list").append("<li data-id="+video.videoId+">\n" +
            "<div class=\"video-banner-item\">\n" +
            "<div class=\"player\">\n" +
            "<div class=\"img-con\">\n" +
            "\n" +
            "</div>\n" +
            "<div class=\"mask\">\n" +
            "<i href=\"javascirpt:void(0);\" class=\"glyphicon glyphicon-play-circle\">\n" +
            "\n" +
            "</i>\n" +
            "</div>\n" +
            "</div>\n" +
            "<span class=\"text\">\n" +
            "<div class=\"top-text\">\n" +
            video.title +
            "</div>\n" +
            "<div class=\"bottom-text\">\n" +
            "<img src="+video.user.headUrl  +" alt=\"item-1\">\n" +
            "<div class=\"author-name\">\n" +
            video.user.nickname +
            "</div>\n" +
            "<div class=\"hot-tag\">\n" +
            "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
            parseFloat(video.likeCount/1000).toFixed(1) +"k"+
            "</div>\n" +
            "<div class=\"playback-tag\">\n" +
            "<i class=\"glyphicon glyphicon-facetime-video\"></i>\n" +
            parseFloat(video.playCount/1000).toFixed(1) +"k"+
            "</div>\n" +
            "</div>\n" +
            "</span>\n" +
            "</div>\n" +
            "</li>")
        $('.banner-content-new .content-new-list .img-con:eq('+index+')').css('background','url('+video.imgUrl+')')
    }
}

