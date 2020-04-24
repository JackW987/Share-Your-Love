// 关注功能移步 js/imgTxt-browser.js
$(".list-btn  li").removeClass('top-nav-active');
$(".list-btn  li:eq(2)").addClass('top-nav-active');
article(getId());
function article(id) {
   axios.get('/api/articles/'+id).then(function (res) {
       if (res.code===404){
           location.href = "/404.html";
           return;
       }
       $(".browse-title").data('id',res.data.article.id);
       $(".browse-title").html(res.data.article.title);
       $(".browse-author-head img").attr("src",res.data.article.user.headUrl);
       $(".browse-author-head img").parent().attr('href','/userCenter-hot/'+res.data.article.user.id);
       $(".browse-author-name a:eq(0)").html(res.data.article.user.nickname);
       $(".browse-author-name a:eq(0)").attr('href','/userCenter-hot/'+res.data.article.user.id);
       $(".browse-author-time span:eq(0)").html(res.data.article.createDate);
       $(".browse-author-time span:eq(1)").append(res.data.article.commentNum);
       $(".browse-author-time span:eq(2)").append(res.data.article.likeCount);
       $(".browse-content").html(res.data.article.text);
       $(".browse-author-name a:eq(1)").data('id',res.data.article.user.id);
       if (res.data.article.isLike){
           $(".love-article-btn").removeClass("love-article-btn-before");
           $(".love-article-btn").addClass("love-article-btn-click")
       }
       if (res.data.article.user.isLike){
           let _this = $(".follow");
           $(_this).removeClass('follow');
           $(_this).addClass('followed');
           $(_this).text('✔ 已关注');
       }

       let cookie = getCookie("Bearer");
       if (cookie!=null){
           if (res.data.article.user.id===JSON.parse(localStorage.user).id){
                $(".follow-change-btn").hide();
           }
       }

       for (let index=0;index<res.data.recommendArticles.length;index++){
          let simpleArticle = res.data.recommendArticles[index];
           $(".right-extend-container:eq(0) ul").append("<li>\n" +
               "<img src="+simpleArticle.imgUrl+" alt=\"star\">\n" +
               "<div>\n" +
               "<a href=/articles/"+simpleArticle.articleId+">\n" +
               simpleArticle.title +
               "</a>\n" +
               "<span>\n" +
               simpleArticle.tag +
               "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
               parseFloat(simpleArticle.likeCount/1000).toFixed(1) + "k"+
               "</span>\n" +
               "</div>\n" +
               "</li>");
       }
       for (let index=0;index<res.data.hotArticles.length;index++){
           let  simpleArticle = res.data.hotArticles[index];
           $(".right-extend-container:eq(1) ul").append("<li>\n" +
               "<img src="+simpleArticle.imgUrl+" alt=\"star\">\n" +
               "<div>\n" +
               "<a href=/articles/"+simpleArticle.articleId+">\n" +
               simpleArticle.title +
               "</a>\n" +
               "<span>\n" +
               simpleArticle.tag +
               "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
               parseFloat(simpleArticle.likeCount/1000).toFixed(1) + "k"+
               "</span>\n" +
               "</div>\n" +
               "</li>");
       }

       //评论列表 第一页 数据量最大10
       comments(0,res.data.article.id);

   })
}

//关注
function follow(id) {
    axios({
        'url':'/api/follower/'+id,
        'method':'post'
    }).then(function () {

    })
}
//点赞文章
$(".love-article-btn").click(function () {
    let cookie = getCookie("Bearer");
    if (cookie!=null){
        axios({
            'url':'/api/articles/like/'+$(".browse-title").data('id'),
            'method':'post'
        }).then(function () {

        })
    }else {
        $(".sign-btn").click();
    }

});
//评论框处头像
commentHead();
function commentHead() {
    let cookie = getCookie("Bearer");
    if (cookie!=null){
        $(".browse-comment-head img").attr('src',JSON.parse(localStorage.user).headUrl);
    }
}
//举报
$('.report-msg-btn').click(function(){
    if ($('#reportBox').find('textarea').val()=='') {
        layer.msg('具体原因不能为空');
    }
    else{
        let data = new FormData();
        data.append('reason',$('#reportBox .form-control option:selected').text());
        data.append('reasonContent',$('#reportBox').find('textarea').val());
        axios({
            'url':'/api/articles/report/'+$(".browse-title").data('id'),
            'method':'post',
            'data':data
        }).then(function (res) {
            if (res===0){
                layer.msg(res.msg);
            }else {
                $('#reportBox').modal('hide');
                $('#reportBox').find('textarea').val('');
                layer.msg('举报原因已发送');
            }
        })

    }
});
//获取评论
function comments(page,id){
    axios({
        'url':'/api/comment/article/'+id,
        'method':'get',
        'params':{
            'page':page,
        }
    }).then(function (res) {
        getComments(res.data)
    })
}
function getComments(res){
    $('.comment-area-ul li').remove();
    for (let index=0;index<res.objectList.length;index++){
        let comment = res.objectList[index];
        let reply = '';

        //回复
        if (comment.replyComments.length>0){
            for (let index=0;index<comment.replyComments.length;index++){
                let like = '';
                if (comment.replyComments[index].isLike){
                    like = 'liked';
                }
                reply += "<li data-replyId="+comment.replyComments[index].replyId+" " +
                    "data-userId="+comment.replyComments[index].fromUser.id+">\n" +
                    "<a href=/userCenter-hot/"+comment.replyComments[index].fromUser.id+ " class=\"comment-user-head\">\n" +
                    "<img src="+comment.replyComments[index].fromUser.headUrl+">\n" +
                    "</a>\n" +
                    "<div class=\"comment-area-name clearfix\">\n" +
                    "<a href=/userCenter-hot/"+comment.replyComments[index].fromUser.id+ " class=\"comment-user-name\">\n" +
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

        //评论
        let like = '';
        if (comment.isLike){
            like = "liked"
        }
        $('.comment-area-ul').append("<li data-commentId="+comment.commentId+" data-userId="+comment.userId+">\n" +
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
            comment.content+
            "</div>\n" +
            "<div class=\"child-comment-area clearfix\">\n" +
            "<textarea></textarea>\n" +
            "<a href=\"javascript:void(0);\" class=\"child-send-btn\">\n" +
            "评论\n" +
            "</a>\n" +
            "</div>\t\n" +
            "<ul class=\"child-comment-ul\">\n" +
                reply+
            "</ul>\n" +
            "</li>")
    }
}
//发表评论
$('.send-comment-msg').click(function(){
    let cookie = getCookie("Bearer");
    if (cookie!=null){
        var PdContent=$('#comment-editor p').text();
        var mainContent=$('#comment-editor .w-e-text').html();
        var addContentElement=$('.comment-area-ul');
        var afterHead=$('.browse-comment-head img').attr('src');
        if (PdContent=='') {
            layer.msg('评论内容不能为空')
        }
        else{
            axios({
                'url':'/api/comment/article/add',
                'method':'post',
                'params':{
                    'articleId':$(".browse-title").data('id'),
                    'content':mainContent
                }
            }).then(function (res) {
                if (res.code==501){
                    layer.msg('您的内容含有敏感词请修改');
                    return
                }
                let text = $(".browse-author-time span:eq(1)").html();
                $(".browse-author-time span:eq(1)").html("评论 "+parseInt((parseInt(text.replace(/[^0-9]/ig,""))+1)))
                let comment = res.data;
                addContentElement.prepend('<li data-commentId='+comment.commentId+' data-userId='+comment.userId+'>' +
                    '<a href=/userCenter-hot/'+comment.userId+ ' class="comment-user-head">' +
                    '<img src='+afterHead+'>' +
                    '</a>' +
                    '<div class="comment-area-name clearfix">' +
                    '<a href=/userCenter-hot/'+comment.userId+ ' class="comment-user-name">'+comment.nickname+
                    '</a>' +
                    '<a href="javascript:void(0);" class="comment-area-btn like-btn">' +
                    '<i class="fa fa-heart"></i>' +
                    '<span>0</span>' +
                    '</a>' +
                    '<a href="javascript:void(0);" class="comment-area-btn comment-btn">' +
                    '<i class="fa fa-comment"></i>' +
                    '</a><' +
                    '/div>' +
                    '<div class="comment-area-time">'+comment.createDate+'</div>' +
                    '<div class="comment-area-text">'+mainContent+'</div>' +
                    '<div class="child-comment-area clearfix">' +
                    '<textarea></textarea>' +
                    '<a href="javascript:void(0);" class="child-send-btn">评论</a>' +
                    '</div>' +
                    '<ul class="child-comment-ul"></ul>' +
                    '</li>');
                $('#comment-editor .w-e-text p').text('');
                layer.msg('评论成功')
            })
        }
    }else {
        $(".sign-btn").click();
    }

});
//回复功能
reply();
function reply(){
    $(document).on('click','.comment-btn',function(event){
        let cookie = getCookie("Bearer");
        if (cookie == null){
            $(".sign-btn").click();
        }else {
            $(this).closest('li').find('.child-comment-area:first').css({
                'display':'block'
            });
            event.stopPropagation();
        }
    });
    $(document).on('click','.child-send-btn',function(){
        let cookie = getCookie("Bearer");
        if (cookie == null){
            $(".sign-btn").click();
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
                    '<a href="javascript:void(0);" class="comment-user-name">'+reply.fromUser.nickname+'</a>' +
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
        let cookie = getCookie("Bearer");
        if (cookie == null){
            $(".sign-btn").click();
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
                    '<a href="javascript:void(0);" class="comment-user-name">'+reply.fromUser.nickname+'</a>' +
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
            $(".sign-btn").click();
        }

    })
}
