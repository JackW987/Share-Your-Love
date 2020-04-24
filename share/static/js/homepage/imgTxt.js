$(".list-btn  li").removeClass('top-nav-active');
$(".list-btn  li:eq(2)").addClass('top-nav-active');
articles(0,'likeCount');
$('.trigger-nav li:eq(0)').click(function () {
    $(".img-txt-atlas li").remove();
    $(".trigger-nav li").removeClass('trigger-li-active');
    $(this).addClass('trigger-li-active');
    articles(0,'likeCount')
});
$('.trigger-nav li:eq(1)').click(function () {
    $(".img-txt-atlas li").remove();
    $(".trigger-nav li").removeClass('trigger-li-active');
    $(this).addClass('trigger-li-active');
    articles(0,'createDate')
});
function articles(page,sort) {
    axios.get('/api/articles',{
        'params':{
            'page': page,
            'size': 10,
            'sort': sort
        }
    }).then(function (res) {
        getArticlesResult(res)
    })
}

$('.trigger-nav li:eq(2)').click(function () {
    $(".img-txt-atlas li").remove();
    $(".trigger-nav li").removeClass('trigger-li-active');
    $(this).addClass('trigger-li-active');
    articlesByTag(0,'createDate','篮球');
});

$('.trigger-nav li:eq(3)').click(function () {
    $(".img-txt-atlas li").remove();
    $(".trigger-nav li").removeClass('trigger-li-active');
    $(this).addClass('trigger-li-active');
    articlesByTag(0,'createDate','足球');
});

$('.trigger-nav li:eq(4)').click(function () {
    $(".img-txt-atlas li").remove();
    $(".trigger-nav li").removeClass('trigger-li-active');
    $(this).addClass('trigger-li-active');
    articlesByTag(0,'createDate','电竞');
});

$('.trigger-nav li:eq(5)').click(function () {
    $(".img-txt-atlas li").remove();
    $(".trigger-nav li").removeClass('trigger-li-active');
    $(this).addClass('trigger-li-active');
    articlesByTag(0,'createDate','娱乐');
});

function articlesByTag(page,sort,tag) {
    axios.get('/api/articles/tag',{
        'params':{
            'page': page,
            'size': 10,
            'sort': sort,
            'tag': tag
        }
    }).then(function (res) {
        getArticlesResult(res)
    })
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
            var max_width=120;
            if ($(this).text().length>max_width) {
                $(this).text($(this).text().substring(0,max_width));
                $(this).html($(this).html()+'...');
            }
        })

    }
}

//推荐作者列表
authors();
function authors() {
    axios.get('/api/user/hot',{
        'params':{
            'size':'5'
        }
    }).then(function (res) {
        for (let index=0;index<res.data.objectList.length;index++){
            let user = res.data.objectList[index];
            $(".more-author-list ul").append("<li data-id="+user.id+">\n" +
                "<div class=\"clearfix\">\n" +
                "<a href=userCenter-hot/"+user.id+ " class=\"follow-head clearfix\">\n" +
                "<img src="+user.headUrl+">\n" +
                "</a>\n" +
                "<a href=userCenter-hot/"+user.id+" class=\"follow-name\"> \n" +
                user.nickname +
                "</a> \n" +
                "<span class=\"follow-introduce\">\n" +
                "已经收获"+parseFloat(user.hot/1000).toFixed(1)+"k个赞\n" +
                "</span>\n" +
                "</div>\n" +
                "<a href=\"javascript:void(0);\" class=\"follow-add-btn\">\n" +
                "+关注\n" +
                "</a>\n" +
                "</li>");
            let cookie = getCookie("Bearer");
            if (cookie!=null){
               if (user.id===JSON.parse(localStorage.user).id){
                   $(".follow-add-btn:eq("+index+")").hide()
               }
            }
            if (user.isLike){
                $(".follow-add-btn:eq("+index+")").addClass('followed')
                $(".follow-add-btn:eq("+index+")").html("✔ 已关注")
            }else {
                $(".follow-add-btn:eq("+index+")").addClass('follow')
            }
        }
    })
}

//点赞
function like(id) {
    axios.post('/api/articles/like/'+id);
}

//关注
function follow(id) {
    axios.post('/api/follower/'+id)
}
//导航点击
$(".to-banner-nav li a").click(function () {
    if ($(this).parent().index()<4){
        location.href="/homepage-banner.html?tag="+$(this).children('span').text().trim();
    }
});

