//todo 测试 实际要根据URL获取Id  bug 关注 12-17
$(".list-btn  li").removeClass('top-nav-active');
$(".list-btn  li:eq(3)").addClass('top-nav-active');
video(getId());
function video(videoId) {
    axios({
        'url':'/api/video/'+videoId,
        'method':'get'
    }).then(function (res) {
        if (res.code===404){
            location.href = "/404.html";
            return;
        }
        let player = TCPlayer("video-player", { // player-container-id 为播放器容器ID，必须与html中一致
            fileID: res.data.video.fileId, // 请传入需要播放的视频filID 必须
            appID: "1253231183", // 请传入点播账号的appID 必须
            autoplay: false //是否自动播放
            //其他参数请在开发文档中查看
        });
        let cookie = getCookie("Bearer");
        const video = res.data.video;
        axios.post('/api/video/play/'+video.videoId);//播放次数+1
        const videoRight = $(".video-author");
        let isLike = '';
        if (cookie!==null){
            let id = JSON.parse(localStorage.user).id;
            if (video.user.id !== id ){
                if (video.user.isLike){
                    isLike = "<a data-id="+video.user.id+" href=\"javascripg:void(0);\" class=\"follow-add-btn followed\">" +
                        "✔ 已关注"+"</a>\n" ;
                }else {
                    isLike = "<a data-id="+video.user.id+" href=\"javascripg:void(0);\" class=\"follow-add-btn follow\">" +
                        "+ 关注"+"</a>\n" ;
                }
            }
        }else {
            isLike = "<a href=\"javascripg:void(0);\" class=\"follow-add-btn follow\">" +
                "+ 关注"+"</a>\n" ;
        }
        videoRight.prepend("<div class=\"opu-title\">\n" +
            video.title +
            "<div class=\"opu-fire\" data-id="+video.videoId+">\n" +
            "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
            parseFloat(video.likeCount/1000).toFixed(1)+"k" +
            "</div>\n" +
            "</div>"+
            "<div class=\"author-head clearfix\">\n" +
            "<img data-id="+video.user.id+" src="+video.user.headUrl+" alt=\"测试图片\" />\n" +
            "<div class=\"author-text\">\n" +
            "<div class=\"clearfix\">\n" +
            "<a href=/userCenter-hot/"+ video.user.id+" class=\"author-text-name\">"+
            video.user.nickname +"</a>\n" +
            isLike+
            "</div>\n" +
            "<span>\n" +
            video.user.signature +
            "</span>\n" +
            "</div>\n" +
            "</div>"+"<p>\n" +
            video.introduction +
            "</p>");
        for (let index=0;index<res.data.otherArticles.length;index++){
                $(".author-blog:eq(0) ul").append("<li>\n" +
                    "<img src="+res.data.otherArticles[index].imgUrl+" alt=\"star\">\n" +
                    "<div class=\"other-text\">\n" +
                    "<a href=/articles/"+res.data.otherArticles[index].articleId+" class=\"other-text-top\">\n" +
                    res.data.otherArticles[index].title +
                    "</a>\n" +
                    "<div class=\"other-text-bottom\">\n" +
                    "<span>"+res.data.otherArticles[index].tag+"</span>\n" +
                    "<span>\n" +
                    "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                    +parseFloat(res.data.otherArticles[index].likeCount/1000).toFixed(1)+"k\n" +
                    "</span>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</li>")
        }
        for (let index=0;index<res.data.otherVideos.length;index++){
            if (res.data.otherVideos[index].videoId!=getId()) {
                $(".author-blog:eq(1) ul").append("<li>\n" +
                    "<img src="+res.data.otherVideos[index].imgUrl+" alt=\"star\">\n" +
                    "<div class=\"other-text\">\n" +
                    "<a href=/videos/"+res.data.otherVideos[index].videoId+" class=\"other-text-top\">\n" +
                    res.data.otherVideos[index].title +
                    "</a>\n" +
                    "<div class=\"other-text-bottom\">\n" +
                    "<span>"+res.data.otherVideos[index].tag+"</span>\n" +
                    "<span>\n" +
                    "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                    +parseFloat(res.data.otherVideos[index].likeCount/1000).toFixed(1)+"k\n" +
                    "</span>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</li>")
            }
        }
        for (let index=0;index<res.data.recommendVideos.length;index++){
            if (res.data.recommendVideos[index].videoId!=getId()) {
                $(".recom-banner ul:eq(0)").append("<li>\n" +
                    "<img src="+res.data.recommendVideos[index].imgUrl+" alt=\"star\">\n" +
                    "<div>\n" +
                    "<a href=/videos/"+res.data.recommendVideos[index].videoId+">\n" +
                    res.data.recommendVideos[index].title +
                    "</a>\n" +
                    "<span>\n" +
                    res.data.recommendVideos[index].tag +
                    "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                    parseFloat(res.data.recommendVideos[index].likeCount/1000).toFixed(1)+"k\n" +
                    "</span>\n" +
                    "</div>\n" +
                    "</li>")
            }

        }

        for (let index=0;index<res.data.relatedVideos.length;index++){
            if (res.data.relatedVideos[index].videoId!=getId()) {
                $(".recom-banner ul:eq(1)").append("<li>\n" +
                    "<img src="+res.data.relatedVideos[index].imgUrl+" alt=\"star\">\n" +
                    "<div>\n" +
                    "<a href=/videos/"+res.data.relatedVideos[index].videoId+">\n" +
                    res.data.relatedVideos[index].title +
                    "</a>\n" +
                    "<span>\n" +
                    res.data.relatedVideos[index].tag +
                    "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                    parseFloat(res.data.relatedVideos[index].likeCount/1000).toFixed(1)+"k\n" +
                    "</span>\n" +
                    "</div>\n" +
                    "</li>")
            }
        }

    })
}
//关注功能
$(document).on('click','.follow-add-btn',function () {
    let cookie = getCookie("Bearer");
    if (cookie==null){
        $('.sign-btn').click();
    }else {
        axios({
            'url':'/api/follower/'+$(this).data('id'),
            'method':'post'
        }).then(function () {

        })
    }
});
//默认最热门评论
comments(getId(),0,'likeCount');
$(".comment-nav li:eq(0)").click(function () {
    $('.comment-nav li').removeClass('comment-nav-li-active');
    $(this).addClass('comment-nav-li-active');
    comments(getId(),0,'likeCount');
});
//最新评论
$(".comment-nav li:eq(1)").click(function () {
    $('.comment-nav li').removeClass('comment-nav-li-active');
    $(this).addClass('comment-nav-li-active');
    comments(getId(),0,'createDate');
});
//我的评论
$(".comment-nav li:eq(2)").click(function () {
    $('.comment-nav li').removeClass('comment-nav-li-active');
    $(this).addClass('comment-nav-li-active');
    myComments(getId(),0,'likeCount');
});
function comments(videoId,page,sort) {
    axios({
        'url':'/api/comment/video/'+videoId,
        'method':'get',
        'params':{
            'page':page,
            'sort':sort
        }
    }).then(function (res) {
        getComments(res.data.objectList)
    })
}
function myComments(videoId,page,sort) {
    axios({
        'url':'/api/comment/video/me/'+videoId,
        'method':'get',
        'params':{
            'page':page,
            'sort':sort
        }
    }).then(function (res) {
        getComments(res.data)
    })
}
function getComments(res){
    $(".browse-comment-area ul li").remove();
    const comments = res;
    for (let index=0;index<comments.length;index++){
        let comment = comments[index];
        let reply = '';
        if (comment.replyComments.length>0){
            for (let index=0;index<comment.replyComments.length;index++){
                let like = null;
                if (comment.replyComments[index].isLike){
                    like = 'liked';
                }
                reply += "<li data-replyId="+comment.replyComments[index].replyId+" " +
                    "data-userId="+comment.replyComments[index].fromUser.id+">\n" +
                    "<a href=/userCenter-hot/"+comment.replyComments[index].fromUser.id +" class=\"comment-user-head\">\n" +
                    "<img src="+comment.replyComments[index].fromUser.headUrl+">\n" +
                    "</a>\n" +
                    "<div class=\"comment-area-name clearfix\">\n" +
                    "<a href=/userCenter-hot/"+comment.replyComments[index].fromUser.id+" class=\"comment-user-name\">\n" +
                    comment.replyComments[index].fromUser.nickname +
                    "</a>\n" +
                    "<a href=\"javascript:void(0);\" class=\"comment-area-btn like-btn "+like+"\">\n" +
                    "<i class=\"fa fa-heart\">\n" +
                    "\n" +
                    "</i>\n" +
                    "<span>\n" +
                    comment.replyComments[index].likeCount +
                    " </span>\n" +
                    "</a>\n" +
                    "<a href=\"javascript:void(0);\" class=\"comment-area-btn comment-btn\">\n" +
                    "<i class=\"fa fa-comment\">\n" +
                    "\n" +
                    "</i>\n" +
                    "</a>\n" +
                    "</div>\n" +
                    "<div class=\"comment-area-time\">\n" +
                    comment.replyComments[index].createDate +
                    "</div>\n" +
                    "<div class=\"comment-area-text child-area-text\">\n" +
                    "<span>\n" +
                    "@"+comment.replyComments[index].toUser.nickname + ": "+
                    "</span>\n" +
                    comment.replyComments[index].content +
                    "</div>\n" +
                    "<div class=\"child-comment-area clearfix\">\n" +
                    "<textarea></textarea>\n" +
                    "<a href=\"javascript:void(0);\" class=\"grandson-send-btn\">\n" +
                    "评论\n" +
                    "</a>\n" +
                    "</div>\n" +
                    "</li>"
            }
        }

        let like = null;
        if (comment.isLike){
            like = "liked"
        }

        $(".browse-comment-area ul:eq(0)").append("<li data-commentId="+comment.commentId+" data-userId="+comment.userId+">\n" +
            "<a href=/userCenter-hot/"+comment.userId+ " class=\"comment-user-head\">\n" +
            "<img src="+comment.headUrl+">\n" +
            "</a>\n" +
            "<div class=\"comment-area-name clearfix\">\n" +
            "<a href=/userCenter-hot/"+comment.userId+ " class=\"comment-user-name\">\n" +
            comment.nickname +
            "</a>\n" +
            "<a href=\"javascript:void(0);\" class=\"comment-area-btn like-btn "+like+"\">\n" +
            "<i class=\"fa fa-heart\">\n" +
            "\n" +
            "</i>\n" +
            "<span>\n" +
            comment.likeCount +
            "</span>\n" +
            "</a>\n" +
            "<a href=\"javascript:void(0);\" class=\"comment-area-btn comment-btn\">\n" +
            "<i class=\"fa fa-comment\">\n" +
            "\n" +
            "</i>\n" +
            "</a>\n" +
            "</div>\n" +
            "<div class=\"comment-area-time\">\n" +
            comment.createDate +
            "</div>\n" +
            "<div class=\"comment-area-text\">\n" +
            comment.content +
            "</div>\n" +
            "<div class=\"child-comment-area clearfix\">\n" +
            "<textarea></textarea>\n" +
            "<a href=\"javascript:void(0);\" class=\"child-send-btn\">\n" +
            "评论\n" +
            "</a>\n" +
            "</div>\n" +
            "<ul class=\"child-comment-ul\">\n" +
            reply +
            "</ul>\n" +
            "</li>")
    }
}
//评论功能
comment(getId());
function comment(videoId){
    let cookie = getCookie("Bearer");
    let user = null;
    if (cookie!=null){
        user = JSON.parse(localStorage.user);
        $(".browse-comment-head img").attr('src',user.headUrl);
    }
    $(document).on('click','.send-comment-msg',function(){
        if (cookie==null){
            $('.sign-btn').click();
            return
        }
        var PdContent=$('#comment-editor p').text();
        var mainContent=$('#comment-editor .w-e-text').html();
        var addContentElement=$('.comment-area-ul');
        if (PdContent==='') {
            layer.msg('评论内容不能为空')
        }
        else{
            axios({
                'url':'/api/comment/video/add',
                'method':'post',
                'params':{
                    'videoId':videoId,
                    'content':mainContent
                }
            }).then(function (res) {
                if (res.code==501){
                    layer.msg('您的内容含有敏感词请修改');
                    return
                }
                let comment = res.data;
                addContentElement.prepend('<li data-commentId='+comment.commentId+' data-userId='+comment.userId+'>' +
                    '<a href="javascript:void(0);" class="comment-user-head">' +
                    '<img src='+comment.headUrl+'>' +
                    '</a>' +
                    '<div class="comment-area-name clearfix">' +
                    '<a href=/userCenter-hot'+comment.userId+' class="comment-user-name">'+user.nickname+'</a>' +
                    '<a href="javascript:void(0);" class="comment-area-btn like-btn">' +
                    '<i class="fa fa-heart"></i><span>0</span>' +
                    '</a>' +
                    '<a href="javascript:void(0);" class="comment-area-btn comment-btn">' +
                    '<i class="fa fa-comment"></i>' +
                    '</a>' +
                    '</div><div class="comment-area-time">'+comment.createDate+'</div>' +
                    '<div class="comment-area-text">'+mainContent+'</div>' +
                    '<div class="child-comment-area clearfix">' +
                    '<textarea></textarea><a href="javascript:void(0);" class="child-send-btn">评论</a>' +
                    '</div>' +
                    '<ul class="child-comment-ul"></ul>' +
                    '</li>');
                $('#comment-editor .w-e-text p').text('');
                layer.msg('评论成功')
            });

        }
    })
}
//回复功能
reply();
function reply(){
    let cookie = getCookie("Bearer");
    $(document).on('click','.comment-btn',function(event){
        if (cookie==null){
            $('.sign-btn').click();
        }else {
            $(this).closest('li').find('.child-comment-area:first').css({
                'display':'block'
            });
            event.stopPropagation();
        }
    });
    $(document).on('click','.child-send-btn',function(){
        if (cookie==null){
            $('.sign-btn').click();
            return;
        }
        var afterContent=$(this).closest('.child-comment-area').find('textarea').val();
        var _this = $(this).parent();
        if (afterContent=="") {
            layer.msg('评论内容不能为空');
        }
        else{
            let  commentId = _this.parent().data("commentid");
            let  toUid = _this.parent().data("userid");
            axios({
                'url':'/api/comment/reply',
                'method':'post',
                'params':{
                    'commentId':commentId,
                    'content':afterContent,
                    'toUid':toUid
                }
            }).then(function (res) {
                if (res.code==501){
                    layer.msg('您的内容含有敏感词请修改');
                    return
                }
                let reply = res.data;
                _this.next('ul').prepend('<li data-replyId='+reply.replyId+' data-userId='+reply.fromUser.id+'>' +
                    '<a href="javascript:void(0);" class="comment-user-head"><img src='+reply.fromUser.headUrl+'></a>' +
                    '<div class="comment-area-name clearfix">' +
                    '<a href=href=/userCenter-hot'+reply.fromUser.id+' class="comment-user-name">'+reply.fromUser.nickname+'</a>' +
                    '<a href="javascript:void(0);" class="comment-area-btn like-btn">' +
                    '<i class="fa fa-heart"></i><span>0</span>' +
                    '</a>' +
                    '<a href="javascript:void(0);" class="comment-area-btn comment-btn">' +
                    '<i class="fa fa-comment"></i>' +
                    '</a></div>' +
                    '<div class="comment-area-time">'+reply.createDate+'</div>' +
                    '<div class="comment-area-text child-area-text">' +
                    '<span>@'+reply.toUser.nickname+'：</span>'+afterContent+'</div>' +
                    '<div class="child-comment-area clearfix"><textarea></textarea>' +
                    '<a href="javascript:void(0);" class="grandson-send-btn">评论</a>' +
                    '</div>' +
                    '</li>');
                _this.closest('.child-comment-area').find('textarea').val('');
                layer.msg('评论成功');
            })
        }
    });
    $(document).on('click','.grandson-send-btn',function(){
        if (cookie==null){
            $('.sign-btn').click();
            return;
        }
        var afterContent=$(this).closest('.child-comment-area').find('textarea').val();
        var _this = $(this).parent();
        if (afterContent==="") {
            layer.msg('评论内容不能为空');
        }
        else{
            let  commentId = _this.parent().parent().parent().data("commentid");
            let  toUid = _this.parent().data("userid");
            axios({
                'url':'/api/comment/reply',
                'method':'post',
                'params':{
                    'commentId':commentId,
                    'content':afterContent,
                    'toUid':toUid
                }
            }).then(function (res) {
                if (res.code==501){
                    layer.msg('您的内容含有敏感词请修改');
                    return
                }
                let reply = res.data;
                _this.parent().parent().append('<li data-replyId='+reply.replyId+' data-userId='+reply.fromUser.id+'>' +
                    '<a href="javascript:void(0);" class="comment-user-head"><img src='+reply.fromUser.headUrl+'></a>' +
                    '<div class="comment-area-name clearfix">' +
                    '<a href=/userCenter-hot'+reply.fromUser.id+' class="comment-user-name">'+reply.fromUser.nickname+'</a>' +
                    '<a href="javascript:void(0);" class="comment-area-btn like-btn">' +
                    '<i class="fa fa-heart"></i><span>0</span>' +
                    '</a>' +
                    '<a href="javascript:void(0);" class="comment-area-btn comment-btn">' +
                    '<i class="fa fa-comment"></i>' +
                    '</a></div>' +
                    '<div class="comment-area-time">'+reply.createDate+'</div>' +
                    '<div class="comment-area-text child-area-text">' +
                    '<span>@'+reply.toUser.nickname+'：</span>'+afterContent+'</div>' +
                    '<div class="child-comment-area clearfix"><textarea></textarea>' +
                    '<a href="javascript:void(0);" class="grandson-send-btn">评论</a>' +
                    '</div>' +
                    '</li>');
                _this.closest('.child-comment-area').find('textarea').val('');
                layer.msg('评论成功');
            });
            $(this).closest('ul').append('<li><a href="javascript:void(0);" class="comment-user-head"><img src='+afterHead+'></a><div class="comment-area-name clearfix"><a href="javascript:void(0);" class="comment-user-name">测试用户三</a><a href="javascript:void(0);" class="comment-area-btn like-btn"><i class="fa fa-heart"></i><span>0</span></a><a href="javascript:void(0);" class="comment-area-btn comment-btn"><i class="fa fa-comment"></i></a></div><div class="comment-area-time">017年6月1日</div><div class="comment-area-text child-area-text"><span>@'+replyUserName+'：</span>'+afterContent+'</div><div class="child-comment-area clearfix"><textarea></textarea><a href="javascript:void(0);" class="grandson-send-btn">评论</a></div></li>')
            $(this).closest('.child-comment-area').find('textarea').val('');
            layer.msg('评论成功');
        }
    })
}
//点赞功能
like();
function like(){
    $(document).on('click','.like-btn',function(){
        let cookie = getCookie("Bearer");
        if (cookie!=null){
            let commentId = $(this).parent().parent().data("commentid");
            if (commentId==null){
                console.log($(this).parent().parent().data("replyid"));
                axios({
                    'url':'/api/comment/replyLike/'+$(this).parent().parent().data("replyid"),
                    'method':'post'
                }).then(function (res) {

                })
            }else {
                axios({
                    'url':'/api/comment/commentLike/'+commentId,
                    'method':'post'
                }).then(function (res) {

                })
            }
            if ($(this).hasClass('liked')) {
                $(this).removeClass('liked');
                var afterNumber=parseInt($(this).find('span').text())-1
                $(this).find('span').text(afterNumber);
            }
            else{
                $(this).addClass('liked');
                var afterNumber=parseInt($(this).find('span').text())+1
                $(this).find('span').text(afterNumber);
            }
        }else {
            $('.sign-btn').click();
        }

    })
}
//举报功能
report(getId());
function report(videoId) {
    $('.report-msg-btn').click(function(){
        if ($('#reportBox').find('textarea').val()==='') {
            layer.msg('具体原因不能为空');
        }
        else{
            let data = new FormData();
            data.append('reason',$('#reportBox .form-control option:selected').text());
            data.append('reasonContent',$('#reportBox').find('textarea').val())
            axios({
                'url':'/api/video/report/'+videoId,
                'method':'post',
                'data':data
            }).then(function (res) {
                $('#reportBox').modal('hide');
                $('#reportBox').find('textarea').val('');
                layer.msg('举报原因已发送');
            });

        }
    })
}

$(document).on('click','.opu-fire',function () {
    let cookie = getCookie('Bearer');
    if (cookie==null){
        $('.sign-btn').click();
    } else {
        axios.post('api/video/like/'+$(this).data('id')).then(function (res) {
            $('.opu-fire').html("<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                parseFloat(res/1000).toFixed(1)+"k")
        })
    }
});

$(document).on('click','.author-head img',function () {
    location.href="/userCenter-hot/"+$(this).data('id');
});
