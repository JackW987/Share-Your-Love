// $(".search-box #search").click(function () {
//     let searchContent = $("#searchContent").val();
//     searchArticle(searchContent,0,null,null);
//     searchVideo(searchContent,0,null,null,0,9999999)
//     getUserResult(searchContent)
// });
if (getQueryString('searchContent')!=null){
    searchArticle(getQueryString('searchContent'),0,null,null);
    searchVideo(getQueryString('searchContent'),0,null,null,0,9999999);
    getUserResult(getQueryString('searchContent'))
}

$(".se-re-imgTxt-btn").click(function () {
    $(".search-input-box").data('type','article');
    let searchContent = $(".search-box input").val();
    if ($(this).index()!==0){
        $(".banner-select-nav").data("tag",$(this).text().trim());
    }else {
        $(".banner-select-nav").data("tag",null)
    }
    let tag =  $(".banner-select-nav").data("tag");
    let index = $(".the-most-nav").data("index")==null ? 0 : $(".the-most-nav").data("index");
    searchArticleByData(index,searchContent,tag)
});
$(".se-re-video-btn").click(function () {
    $(".search-input-box").data('type','video');
    let searchContent = $(".search-box input").val();
    if ($(this).index()!==0){
        $(".banner-select-nav").data("tag",$(this).text().trim());
    }else {
        $(".banner-select-nav").data("tag",null)
    }
    let tag =  $(".banner-select-nav").data("tag");
    let index = $(".the-most-nav").data("index")==null ? 0 : $(".the-most-nav").data("index");
    searchVideosByData(index,searchContent,tag,null,null)
});

$(".the-most-nav li").click(function () {
    let searchContent = $(".search-box input").val();
    $(".the-most-nav").data("index",$(this).index());
    console.log($(this).index());
    if ($(".search-input-box").data('type')==="article") {
        searchArticleByData($(this).index(),searchContent,$(".banner-select-nav").data("tag"))
    }else {
        searchVideosByData($(this).index(),searchContent,$(".banner-select-nav").data("tag"),
            $(".time-select-nav").data('startTime'),$(".time-select-nav").data('endTime'))
    }
});

$(".time-select-nav li").click(function () {
    let searchContent = $(".search-box input").val();
    let startTime = 0,endTime = 99999;
    if ($(this).index()===1){
        endTime = 600
    }else if ($(this).index()===2) {
        startTime = 601;
        endTime=1800
    }else if ($(this).index()===3) {
        startTime = 1801
    }
    $(".time-select-nav").data('startTime',startTime);
    $(".time-select-nav").data('endTime',endTime);
    searchVideosByData($(this).index(),searchContent,$(".banner-select-nav").data("tag"),
        startTime,endTime)
})

$(".banner-select-nav li").click(function () {
    let searchContent = $(".search-box input").val();
    if ($(this).index()!==0){
        $(".banner-select-nav").data("tag",$(this).text().trim());
    }else {
        $(".banner-select-nav").data("tag",null)
    }
    let tag =  $(".banner-select-nav").data("tag");
    let index = $(".the-most-nav").data("index")==null ? 0 : $(".the-most-nav").data("index");
    if ($(".search-input-box").data('type')==="article"){
        searchArticleByData(index,searchContent,tag)
    }else {
        searchVideosByData($(this).index(),searchContent,$(".banner-select-nav").data("tag"),
            $(".time-select-nav").data('startTime'),$(".time-select-nav").data('endTime'))
    }
});

function searchVideosByData(index,searchContent,tag,startTime,endTime) {
    if (index===0) {
        searchVideo(searchContent,0,tag,null,startTime,endTime);
    }else if (index===1){
        searchVideo(searchContent,0,tag,"play_count",startTime,endTime);
    }else if (index===2){
        searchVideo(searchContent,0,tag,"comment_num",startTime,endTime);
    }else {
        searchVideo(searchContent,0,tag,"like_count",startTime,endTime);
    }
}

function searchArticleByData(index,searchContent,tag) {
    if (index===0) {
        searchArticle(searchContent,0,tag,null);
    }else if (index===1){
        searchArticle(searchContent,0,tag,"read_count");
    }else if (index===2){
        searchArticle(searchContent,0,tag,"comment_num");
    }else {
        searchArticle(searchContent,0,tag,"like_count");
    }
}

function searchVideo(searchContent,page,tag,sort,startTime,endTime) {
    axios.get('/api/search/videos',{
        'params':{
            'searchContent': searchContent,
            'page':page,
            'size': 10,
            'tag': tag,
            'sort':sort,
            'startTime':startTime,
            'endTime':endTime
        }
    }).then(function (res) {
        $(".video-show-banner ul li").remove();
        getVideosResult(res)
    })
}

function searchArticle(searchContent,page,tag,sort) {
    axios.get('/api/search/articles',{
        'params':{
            'searchContent': searchContent,
            'page':page,
            'size': 10,
            'tag': tag,
            'sort':sort
        }
    }).then(function (res) {
        $(".img-txt-atlas li").remove();
        getArticlesResult(res)
    })
}


function getVideosResult(res) {
    for (let index=0;index<res.data.videos.length;index++){
        let v = res.data.videos[index];
        $(".video-show-banner ul").append("<li data-id="+v.videoId+">\n" +
            "<a href=\"javascript:void(0);\" class=\"plate-remove-btn\"></a>"+
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
        $('.video-show-banner ul li .img-con:eq('+index+') ').css("background-image","url(" + v.imgUrl + ")")
    }
}

function getArticlesResult(res) {
    for (let index=0;index<res.data.objectList.length;index++){
        let article = res.data.objectList[index];
        $(".img-txt-atlas").append("<li>\n" +
            "<div class=\"img-txt-main-author clearfix\">\n" +
            "<a href="+"/userCenter-hot/"+article.user.id+" class=\"img-txt-main-head\">\n" +
            "<img src="+article.user.headUrl+" alt=\"admin-1\">\n" +
            article.user.nickname +
            "</a>\n" +
            "</div>\n" +
            "<a href="+"/articles/"+article.id+" class=\"img-txt-main-title\">\n" +
            article.title +
            "</a>\n" +
            "<div class=\"img-txt-main-txt\">\n" +
            removeHTMLTag(article.text)+
            "</div>\n" +
            "<div class=\"img-txt-main-img\"></div>\n" +
            "<div class=\"img-txt-main-bottom\">\n" +
            "<a href=/homepage-banner.html?tag="+article.tag+" class=\"bottom-label\">\n" +
            article.tag +
            "</a>\n" +
            "<a href=\"javascript:void(0);\" data-id="+article.id+" class=\"bottom-click like\">\n" +
            "<i class=\"fa fa-heart\"></i>\n" +
            "<span>"+article.likeCount+"</span>\n" +
            "</a>\n" +
            "<a href="+"/articles/"+article.id+" class=\"bottom-click\">\n" +
            "<i class=\"fa fa-comment\"></i>\n" +
            "<span>"+article.commentNum+"</span>\n" +
            "</a>\n" +
            "<a href=\"javascript:void(0);\" class=\"bottom-click\">\n" +
            "<i class=\"fa fa-share\"></i>\n" +
            "<span>"+article.readCount+"</span>\n" +
            "</a>\n" +
            "</div>\n" +
            "</li>");
        if (article.isLike){
            $(".like:eq("+index+")").addClass('liked')
        }
        $(".img-txt-main-img:eq("+index+")").css("background","url("+article.bgImg+")");

        $('.img-txt-main-txt').each(function(){
            var max_width=140;
            if ($(this).text().length>max_width) {
                $(this).text($(this).text().substring(0,max_width));
                $(this).html($(this).html()+'...');
            }
        })

    }
}

function getUserResult(searchContent){
    axios.get('/api/search/users',{
        'params':{
            'searchContent':searchContent
        }
    }).then(function (res) {
        $(".user-show-banner div").remove();
        for (let index=0;index<res.data.length;index++){
            let circle = res.data[index];
            let user = circle.simpleUserDTO;
            let works = '';
            for (let index=0;index<circle.simpleWorkDTOs.length;index++){
                if(circle.simpleWorkDTOs[index][2]==='article'){
                    works+="<li>\n" +
                        "<a href=articles/"+circle.simpleWorkDTOs[index][0]+">\n" +
                        circle.simpleWorkDTOs[index][1] +
                        "</a>\n" +
                        "</li>\n"
                }else {
                    works+="<li>\n" +
                        "<a href=videos/"+circle.simpleWorkDTOs[index][0]+">\n" +
                        circle.simpleWorkDTOs[index][1] +
                        "</a>\n" +
                        "</li>\n"
                }
            }
            $(".user-show-banner").append("<div class=\"col-xs-4\">\n" +
                "<div class=\"follow-user-banner\">\n" +
                "<span class=\"follow-user-banner-name\">\n" +
                user.nickname +
                "</span>\n" +
                "<a href=userCenter-hot/"+user.id+" class=\"follow-user-banner-head\">\n" +
                "\n" +
                "</a>\n" +
                "<span class=\"follow-user-banner-txt\">\n" +
                user.introduction +
                "</span>\n" +
                "<a href=\"javascipt:void(0);\" data-id="+user.id+" class=\"follow-green-btn\">\n" +
                "+ 关注\n" +
                "</a>\n" +
                "<div class=\"follow-recent-update-title clearfix\">\n" +
                "<span>\n" +
                "最近更新\n" +
                "</span>\n" +
                "<div>\n" +
                "\n" +
                "</div>\n" +
                "</div>\n" +
                "<div class=\"follow-recent-update-menu\">\n" +
                "<ul class=\"clearfix\">\n" +
                works+
                "</ul>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>");
            let cookie = getCookie("Bearer");
            if (cookie!=null){
                if (user.id===JSON.parse(localStorage.user).id){
                    $('.follow-green-btn:eq('+index+')').hide();
                }
            }
            if (user.isLike){
                $('.follow-green-btn:eq('+index+')').addClass('follow-green-btn-followed');
                $('.follow-green-btn:eq('+index+')').text('✔ 已关注')
            }
            $(".follow-user-banner-head:eq("+index+")").css('background','url('+user.headUrl+')')
        }
        fontLength()
    })
}

//点击事件
$(document).on('click','.plate-section-video:eq(0) .top-text',function () {
    location.href="/videos/"+($(this).parent().parent().parent().data('id'));
});
$(document).on('click','.mask',function () {
    location.href="/videos/"+($(this).parent().parent().parent().data('id'));
});

function fontLength(){
    $('.follow-user-banner-txt').each(function(){
        var max_width=26;
        if ($.trim($(this).text()).length>max_width) {
            $(this).text($.trim($(this).text()).substring(0,max_width));
            $(this).html($(this).html()+'...');
        }
    })
    $('.follow-recent-update-menu ul li a').each(function(){
        var max_width=10;
        if ($.trim($(this).text()).length>max_width) {
            $(this).text($.trim($(this).text()).substring(0,max_width));
            $(this).html($(this).html()+'...');
        }
    })
}

//关注
function follow(id) {
    axios.post('/api/follower/'+id)
}

//点赞
function like(id) {
    axios.post('/api/articles/like/'+id);
}