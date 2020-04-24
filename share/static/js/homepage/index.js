//todo  页面跳转点击事件未加入 视频Id：videoId 文章Id:id 人Id:id
let player;
let videoPage=0;
let articlePage=0;
//展示首页视频
showHotVideos();
function showHotVideos() {
    axios({
        'url':'/api/video',
        'method':'get',
        'params':{
            'size':'6',
            'sort':'playCount'
        }
    }).then(function (res) {
        for (let index=0;index<res.data.videos.length;index++) {
            let video = res.data.videos[index];
            $(".video-item-nav").append("<li data-fileId="+video.fileId+" data-videoId="+video.videoId+">\n" +
                "<img src="+video.imgUrl+" alt=\"item-2\">\n" +
                "<i class=\"glyphicon glyphicon-triangle-left\"></i>\n" +
                "</li>")
        }
        $(".video-item-nav li:eq(0)").addClass("video-item-active");
        $(".video-container .video-box a").attr("href","/videos/"+res.data.videos[0].videoId);
        player = TCPlayer("banner-video", { // player-container-id 为播放器容器ID，必须与html中一致
        fileID: res.data.videos[0].fileId, // 请传入需要播放的视频filID 必须
        appID: "1253231183", // 请传入点播账号的appID 必须
        autoplay: false //是否自动播放
        //其他参数请在开发文档中查看
    });
    })
}

//推广, 以及下方视频和文章
recommendAndVideosAndArticles();
function recommendAndVideosAndArticles() {
    axios.all([
        axios.get('/api/video',{
        'params':{
            'sort':'likeCount',
            'size':'8'
        }
        }),
        axios.get('/api/articles',{
        'params':{
            'sort':'likeCount',
            'size':'8'
        }
    })
    ]).then(axios.spread(function (rs1,rs2) {
        let count = 0;
        for (let index=0;index<rs1.data.videos.length;index++){
            let video = rs1.data.videos[index];

            //推广视频 取前4
            if (index<4){
                $(".extend-container:eq(0) ul").append("<li data-type='video' data-id="+video.videoId+">\n" +
                    "<div class=\"player\">\n" +
                    "<img src="+video.imgUrl+" alt=\"item-1\">\n" +
                    "<a href=/videos/"+video.videoId+" class=\"mask\">\n" +
                    "<i href=\"javascirpt:void(0);\" class=\"glyphicon glyphicon-play-circle\">\n" +
                    "</i>\n" +
                    "</a>\n" +
                    "</div>\n" +
                    "<span class=\"text\">"+video.title+"</span>\n" +
                    "</li>");
                if (index<3){
                    $(".extend-rank:eq(0) ul").append("<li data-type='video' data-id="+video.videoId+">\n" +
                        "<span class=\"mark mark-top\">\n" +
                        (index+1)+
                        "</span>\n" +
                        video.title+
                        "</li>")
                    count+=video.playCount;
                }else {
                    $(".extend-rank:eq(0) ul").append("<li data-type='video' data-id="+video.videoId+">\n" +
                        "<span class=\"mark \">\n" +
                        (index+1)+
                        "</span>\n" +
                        video.title+
                        "</li>")
                    count+=video.playCount;
                }
            }

            //视频
            $('.extend-container:eq(1) ul').append("<li data-type='video' data-id="+video.videoId+">\n" +
                "<div class=\"player\">\n" +
                "<img src="+video.imgUrl+" alt=\"item-1\">\n" +
                "<a class=\"mask\" href=videos/"+video.videoId+">\n" +
                "<i href=\"javascirpt:void(0);\" class=\"glyphicon glyphicon-play-circle\">\n" +
                "</i>\n" +
                "</a>\n" +
                "</div>\n" +
                "<span class=\"text\">"+video.title+"</span>\n" +
                "</li>");

            //排名
            if (index<3){
                $(".rank-list:eq(2)").append("<li data-type='video' data-id="+video.videoId+">\n" +
                    "<span class=\"mark mark-top\">\n" +
                    (index+1)+
                    "</span>\n" +
                    video.title+
                    "</li>")
            }else {
                $(".rank-list:eq(2)").append("<li data-type='video' data-id="+video.videoId+">\n" +
                    "<span class=\"mark \">\n" +
                    (index+1)+
                    "</span>\n" +
                    video.title+
                    "</li>")
            }

        }

        for (let index=0;index<rs2.data.objectList.length;index++){
            let article = rs2.data.objectList[index];
            //推广文章 取前4
            const smallTags = [];
            for (let index=0;index<article.smallTags.length;index++){
                smallTags[index] = article.smallTags[index].smallTag;
            }
            if (index<4){

                //排名
                $(".extend-rank:eq(0) ul").append("<li data-type='article' data-id="+article.id+">\n" +
                    "<span class=\"mark \">\n" +
                    (index+1+4)+
                    "</span>\n" +
                    article.title+
                    "</li>");

                //推广
                $(".extend-container:eq(0) ul").append("<li data-type='article' data-id="+article.id+">\n" +
                    "<div class=\"player\">\n" +
                    "<img src="+article.bgImg+" alt=\"item-1\">\n" +
                    "<div class=\"text-mask-banner\">\n" +
                    "<span class=\"mask-top-text\">\n" +
                    "<b>\n" +
                    smallTags+
                    "</b>\n" +
                    "</span>\n" +
                    "<span class=\"mask-bottom-text\">\n" +
                    removeHTMLTag(article.text)+
                    "</span>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "<span class=\"text\">"+article.title+"</span>\n" +
                    "</li>");
                count+=article.readCount;
            }

            //文章
            $('.extend-container:eq(2) ul').append("<li data-type='article' data-id="+article.id+">\n" +
                "<div class=\"player\">\n" +
                "<img src="+article.bgImg+" alt=\"item-1\">\n" +
                "<div class=\"text-mask-banner\">\n" +
                "<span class=\"mask-top-text\">\n" +
                "<b>\n" +
                smallTags+
                "</b>\n" +
                "</span>\n" +
                "<span class=\"mask-bottom-text\">\n" +
                removeHTMLTag(article.text)+
                "</span>\n" +
                "</div>\n" +
                "</div>\n" +
                "<span class=\"text\">"+article.title+"</span>\n" +
                "</li>");

            //排名
            if (index<3){
                $(".rank-list:eq(3)").append("<li data-type='article' data-id="+article.id+">\n" +
                    "<span class=\"mark mark-top\">\n" +
                    (index+1)+
                    "</span>\n" +
                    article.title+
                    "</li>");
            }else {
                $(".rank-list:eq(3)").append("<li data-type='article' data-id="+article.id+">\n" +
                    "<span class=\"mark \">\n" +
                    (index+1)+
                    "</span>\n" +
                    article.title+
                    "</li>");
            }
        }
        $('.extend-top .extend-list .nav a:eq(0)').html("点击量："+count)
    }))


}

//大神排行
peopleRank();
function peopleRank(){
    axios.get('/api/user/hot').then(function (res) {
        for (let index=0;index<res.data.objectList.length;index++){
            let people = res.data.objectList[index];
            let introduction = people.introduction;
            if (introduction==null){
                introduction = '';
            }
            if (index<9){
                $(".pop-user-info").append("<li data-id="+people.id+">\n" +
                    "<img src="+people.headUrl+" alt=\"item-1\">\n" +
                    "<h5>"+people.nickname+"</h5>\n" +
                    "<span>\n" +
                    introduction +
                    "</span>\n" +
                    "</li>")
            }
            if (index<3) {
                $(".pop-user-rank .rank-list").append("<li data-id="+people.id+">\n" +
                    "<span class=\"mark mark-top\">\n" +
                    (index+1)+
                    "</span>\n" +
                    people.nickname+
                    "<span class=\"hot-mark\">\n" +
                    "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                    people.hot+
                    "</span>\n" +
                    "</li>")
            }else {
                $(".pop-user-rank .rank-list").append("<li>\n" +
                    "<span class=\"mark\">\n" +
                    (index+1)+
                    "</span>\n" +
                    people.nickname+
                    "<span class=\"hot-mark\">\n" +
                    "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                    people.hot+
                    "</span>\n" +
                    "</li>")
            }

        }
    })
}

//公告
announcements();
function announcements(){
    //文字公告栏
    axios({
        'url':'/api/announcements',
        'params':{
            'page':'0',
            'size':'9'
        }
    }).then(function (res) {
        for (let index=0;index<res.data.objectList.length;index++){
            let  announcement = res.data.objectList[index];
            $(".bull-rank-list .bull-list").append("<li>\n" +
                "<a href=homepage-notice.html?type="+announcement.tag+" class=\"bull-tag\">\n" +
                announcement.tag +
                "</a>\n" +
                "<a href=/notices/"+announcement.id+" class=\"bull-list-text\">\n" +
                announcement.title+
                "</a>\n" +
                "<span class=\"bull-time-tag\">\n" +
                announcement.createDate +
                "</span>\n" +
                "</li>");
            if (index<8){
                $(".bull-rank-list .bull-hot-list").append("<a href=/notices/"+announcement.id+" class=\"hot-tag\">\n" +
                    announcement.title+
                    "</a>")
            }
        }
    });

    //图片公告栏
    axios({
        'url':'/api/pictures',
        'params':{
            'type':'公告',
            'page':'0',
            'size':'5'
        }
    }).then(function (res) {
        for (let index=0;index<res.data.objectList.length;index++){
            let picture =  res.data.objectList[index];
            $(".bull-item:eq("+index+")").css("background","url("+picture.imgUrl+")");
        }
    });

    axios({
        'url':'/api/announcements/tag',
        'params':{
            'tag':'新闻',
            'page':'0',
            'size':'5'
        }
    }).then(function (res) {
        for (let index=0;index<res.data.objectList.length;index++){
            let  announcement = res.data.objectList[index];
            $(".bull-banner .row .col-md-8 .bull-banner-mask:eq("+index+")").data('id',announcement.id)
        }
    })

}

//图片公共栏点击事件
$(".bull-banner-mask").click(function () {
    if ($(this).data('id')!=null){
        location.href="/notices/"+$(this).data('id');
    }
});

//换一换视频
$('.item-change-btn:eq(0)').click(function () {
    videoPage +=1;
    videos(videoPage);
});
function videos(page){
    //视频
    axios.get('/api/video',{
        'params':{
            'page':page,
            'sort':'likeCount',
            'size':'8'
        }
    }).then(function (res) {
        if (res.data.videos.length===0){
            layer.msg("到底啦")
            return
        }
        $('.extend-container:eq(1) ul li').remove();
        for (let index=0;index<res.data.videos.length;index++) {
            let video = res.data.videos[index];
            $('.extend-container:eq(1) ul').append("<li>\n" +
                "<div class=\"player\">\n" +
                "<img src="+video.imgUrl+" alt=\"item-1\">\n" +
                "<div class=\"mask\">\n" +
                "<i href=\"javascirpt:void(0);\" class=\"glyphicon glyphicon-play-circle\">\n" +
                "</i>\n" +
                "</div>\n" +
                "</div>\n" +
                "<span class=\"text\">"+video.title+"</span>\n" +
                "</li>");
        }
    })
}
//换一换文章
$('.item-change-btn:eq(1)').click(function () {
    articlePage +=1;
    articles(articlePage);
});
function articles(page){
    //文章
    axios.get('/api/articles',{
        'params':{
            'page':page,
            'sort':'likeCount',
            'size':'8'
        }
    }).then(function (res) {
        if (res.data.objectList.length===0){
            layer.msg("到底啦")
            return
        }
        $('.extend-container:eq(2) ul li').remove();
        for (let index=0;index<res.data.objectList.length;index++){
            let article = res.data.objectList[index];
            const smallTags = [];
            for (let index=0;index<article.smallTags.length;index++){
                smallTags[index] = article.smallTags[index].smallTag;
            }
            $('.extend-container:eq(2) ul').append("<li data-type='article' data-id="+article.id+">\n" +
                "<div class=\"player\">\n" +
                "<img src="+article.bgImg+" alt=\"item-1\">\n" +
                "<div class=\"text-mask-banner\">\n" +
                "<span class=\"mask-top-text\">\n" +
                "<b>\n" +
                smallTags+
                "</b>\n" +
                "</span>\n" +
                "<span class=\"mask-bottom-text\">\n" +
                removeHTMLTag(article.text)+
                "</span>\n" +
                "</div>\n" +
                "</div>\n" +
                "<span class=\"text\">"+article.title+"</span>\n" +
                "</li>");
        }
    })
}

//最新投稿
newCount();
function newCount() {
    axios.get('/api/data/newCount').then(function (res) {
        $('.extend-top .extend-list .nav a:eq(1)').html(" 最新投稿: "+res)
    })
}

//切换视频
function play(fileId) {
    player.loadVideoByID({
        fileID: fileId, // 请传入需要播放的视频 filID 必须
        appID: '1253231183', // 请传入点播账号的 appID 必须
    })
}

$(document).on('click','.extend-top .extend-container .list li',function () {
    if ($(this).data('type')==="article"){
        location.href="/articles/"+$(this).data('id');
    }
});
$(document).on('click','.extend-top .extend-rank li',function () {
    if ($(this).data('type')==="article"){
        location.href="/articles/"+$(this).data('id');
    }else {
        location.href="/videos/"+$(this).data('id');
    }
});

//模块点击事件
$(".four-plate a").click(function () {
    if ($(this).parent().index()===1){
        location.href = "/homepage-banner.html?tag=篮球"
    }else if ($(this).parent().index()===2){
        location.href = "/homepage-banner.html?tag=足球"
    } else if ($(this).parent().index()===3){
        location.href = "/homepage-banner.html?tag=电竞"
    } else {
        location.href = "/homepage-banner.html?tag=娱乐"
    }
});

//大神排行点击事件
$(document).on('click',".pop-user-rank .rank-list li",function () {
    location.href = "/userCenter-hot/"+$(this).data('id')
});
$(document).on('click','.pop-user-info li',function () {
    location.href = "/userCenter-hot/"+$(this).data('id')
});

