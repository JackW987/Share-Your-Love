$(function(){

    $(".list-btn  li").removeClass('top-nav-active');
    $(".list-btn  li:eq(3)").addClass('top-nav-active');
    videos(0,'likeCount');

    $(".video-banner-nav ul li:eq(0)").click(function () {
        videos(0,'likeCount')
    });

    $(".video-banner-nav ul li:eq(1)").click(function () {
       videos(0,'createDate')
    });

    function videos(page,sort) {
        axios({
            'url':'/api/video',
            'method':'get',
            'params':{
                'page':page,
                'size':'20',
                'order':'desc',
                'sort':sort
            }
        }).then(function (res){
            videoResult(res)
        });

        $(".video-banner-nav ul li:eq(2)").click(function () {
            videosByTag(0,'篮球','likeCount')
        });

        $(".video-banner-nav ul li:eq(3)").click(function () {
            videosByTag(0,'足球','likeCount')
        });

        $(".video-banner-nav ul li:eq(4)").click(function () {
            videosByTag(0,'电竞','likeCount')
        });

        $(".video-banner-nav ul li:eq(5)").click(function () {
            videosByTag(0,'娱乐','likeCount')
        });
        
        function videosByTag(page,tag,sort) {
            axios({
                'url':'/api/video/tag',
                'method':'get',
                'params':{
                    'page':page,
                    'size':'10',
                    'sort':sort,
                    'tag':tag
                }
            }).then(function (res) {
                videoResult(res)
            })
        }

        function videoResult(res) {
            $(".video-banner div:eq(0) div").remove();
            let videos = res.data.videos;
            for (let index=0;index<videos.length;index++){
                let video = videos[index];
                $(".video-banner div:eq(0)").append("<div data-id="+video.videoId+" class=\"col-sm-6 col-md-4 div-to-5\">\n" +
                    "<div class=\"video-banner-item\">\n" +
                    "<div class=\"player\">\n" +
                    "<div class=\"img-con\">\n" +
                    "\n" +
                    "</div>\n" +
                    "<div class=\"mask\">\n" +
                    "<i href=\"javascirpt:void(0);\" class=\"glyphicon glyphicon-play-circle\">\n" +
                    "</i>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "<span class=\"text\">\n" +
                    "<div class=\"top-text clearfix\">\n" +
                    "<div class=\"top-title\">\n" +
                    video.title +
                    "</div>\n" +
                    "<div class=\"type-tag\">\n" +
                    video.tag +
                    "</div>\n" +
                    "</div>\n" +
                    "<div class=\"bottom-text\">\n" +
                    "<img src="+video.user.headUrl+" alt=\"item-1\">\n" +
                    "<div class=\"author-name\">\n" +
                    video.user.nickname +
                    "</div>\n" +
                    "<div class=\"hot-tag\">\n" +
                    "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                    parseInt(video.likeCount/1000)+"k"+
                    "</div>\n" +
                    "<div class=\"playback-tag\">\n" +
                    "<i class=\"glyphicon glyphicon-facetime-video\"></i>\n" +
                    parseInt(video.playCount/1000)+"k"+
                    "</div>\n" +
                    "</div>\n" +
                    "</span>\n" +
                    "</div>\n" +
                    "</div>");
                $('.video-banner-item .img-con:eq('+index+')').css("background-image","url(" + video.imgUrl + ")")
            }
        }

        //导航计数
        count();
        function count() {
            axios({
                'url':'/api/video/count',
                'method':'get'
            }).then(function (res) {
                $('.video-banner-nav li:eq(0) div').html(res.data[1].num)
                $('.video-banner-nav li:eq(1) div').html(res.data[1].num)
                $('.video-banner-nav li:eq(2) div').html(res.data[3].num)
                $('.video-banner-nav li:eq(3) div').html(res.data[2].num)
                $('.video-banner-nav li:eq(4) div').html(res.data[5].num)
                $('.video-banner-nav li:eq(5) div').html(res.data[4].num)
            })
        }
        
    }
});

$(document).on('click','.mask',function () {
    location.href="/videos/"+$(this).parent().parent().parent().data('id');
})
$(document).on('click','.top-title',function () {
    location.href="/videos/"+$(this).parent().parent().parent().parent().data('id');
})