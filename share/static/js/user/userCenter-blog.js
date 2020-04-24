//占比
blogProportion(getId());
// 查看
blog(getId(),0,'createDate');
function blog(id,page,sort) {
    axios({
        'url':"/api/articles/user/"+id,
        'method':'get',
        'params':{
            'page':0,
            'size':10,
            'sort':sort
        }
    }).then(function (res) {
        if (cookie==null){
            $(".plate-section-title a:eq(0)").html("ta上传的博文");
        }else {
            if (JSON.parse(localStorage.user).id!=getId()){
                $(".plate-section-title a:eq(0)").html("ta上传的博文");
            }
        }
        $(".plate-section-div .plate-section-list li").remove();
        const blogs = res.data.objectList;
        const totalElements = res.data.totalElements;
        const totalPages = res.data.totalPages;
        $(".plate-section-title .plate-title-work-count").html(totalElements+"<span class=\"work-count-decoration\"/>");
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

            $(".plate-section-div .plate-section-list").append("<li data-id="+article.id+">\n" +
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
    if (JSON.parse(localStorage.user).id==getId()){
        $('.plate-more-btn').show();
        //删除
        $(document).on('click','.plate-remove-btn',function(){
            const _this = $(this);
            layer.confirm('是否删除此作品', {
                btn: ['确定','取消'] //按钮
            }, function(){
                deleteBlog( _this.parent('li').data('id'));//删除博客 8.31
                let workLength=$('.plate-section-list li').length;//重新计数 8.31
                _this.parent('li').remove();
                workLength--;
                $('.plate-title-work-count').html(workLength+'<span class="work-count-decoration"></span>');
                layer.msg('删除成功');
            }, function(){
            });
        });
    }else {
        $('.plate-more-btn').hide();
    }
}else {
    $('.plate-more-btn').hide();
}
function deleteBlog(id) {
    axios({
        'url':"/api/articles/"+id,
        'method':'delete',
         'withCredentials': true
    }).then(function (res) {
        console.log(res.msg)
    })
}

//点击跳转事件
$(document).on('click','.top-text',function () {
    location.href="/articles/"+($(this).parent().parent().parent().data('id'));
});
$(document).on('click','.blog-img-con',function () {
    location.href="/articles/"+($(this).parent().parent().parent().data('id'));
});