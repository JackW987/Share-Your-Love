//占比
videoProportion(getId());
// 查看
video(getId(),'0','createDate');
function video(id,page,sort) {
    axios({
        'url':"/api/video/user/"+id,
        'method':'get',
        'params':{
            'page':0,
            'size':10,
            'sort':sort,
            'enable': true
        }
    }).then(function (res) {
        $(".plate-section-video ul:eq(1) li").remove();
        const videos = res.data.videos;
        const totalElements = res.data.totalElements;
        const totalPages = res.data.totalPages;
        $(".plate-section-title .plate-title-work-count").html(totalElements+"<span class=\"work-count-decoration\"/>");
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

            const smallTags = [];
            for (let index=0;index<video.smallTags.length;index++){
                smallTags[index] = video.smallTags[index].smallTag;
            }

            $(".plate-section-video:eq(0) .plate-section-list").append("<li data-id="+v.videoId+">\n" +
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
            $('.plate-section-list .img-con:eq('+index+') ').css("background-image","url(" + v.imgUrl + ")")
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
//删除
$(document).on('click','.plate-remove-btn',function(){
    const _this = $(this);
    layer.confirm('是否删除此作品', {
        btn: ['确定','取消'] //按钮
    }, function(){
        deleteVideo( _this.parent('li').data('id'));//删除博客 8.31
        let workLength=$('.plate-section-list li').length;//重新计数 8.31
        _this.parent('li').remove();
        workLength--;
        $('.plate-title-work-count').html(workLength+'<span class="work-count-decoration"></span>');
        layer.msg('删除成功');
    }, function(){
    });
});
function deleteVideo(id) {
    axios({
        'url':"/api/video/"+id,
        'method':'delete'
    }).then(function (res) {
        console.log(res.msg)
    })
};
//点击事件
$(document).on('click','.plate-section-video:eq(0) .top-text',function () {
    location.href="/videos/"+($(this).parent().parent().parent().data('id'));
});
$(document).on('click','.mask',function () {
    location.href="/videos/"+($(this).parent().parent().parent().data('id'));
});

function disable() {
    $(".plate-more-btn").hide();
    $(".plate-title-tag").html("ta上传的视频")
}

