//占比
fansProportion(getId());
//关注列表
follows(getId(),0);
$('.work-nav-follow-btn').click(function () {
    follows(getId(),0);
});
function follows(id,page) {
    axios({
        'url':'/api/follower/followers/'+id,
        'method':'get',
        'params':{
            'page':page
        }
    }).then(function (res) {
        $(".follow-list-banner li").remove();
        const userList = res.data.objectList;
        for (let index=0;index<userList.length;index++){
            let user ={
                "id": userList[index].id,
                "nickname": userList[index].nickname,
                "headUrl": userList[index].headUrl,
                "signature":userList[index].signature
            }
            $(".follow-list-banner").append("<li data-id="+user.id+">\n" +
                "<a href=\"javascript:void(0);\" class=\"circle-list-head\">\n" +
                "<img src="+user.headUrl+">\n" +
                "</a>\n" +
                "<div class=\"circle-list-text\">\n" +
                "<a href=/userCenter-hot/"+user.id+">\n" +
                user.nickname+
                "</a>\n" +
                "<span>\n" +
                user.signature +
                "</span>\n" +
                "</div>\n" +
                "<a href=\"javascript:void(0);\" class=\"circle-follow-btn followed\">\n" +
                "✔ 已关注\n" +
                "</a>\n" +
                "</li>")
        }
        if (cookie!=null){
            if (JSON.parse(localStorage.user).id!=getId()){
                $(".plate-section-title a").html("ta的关注");
                $(".plate-section-div ul li:eq(0) a").html("ta的关注");
                $(".plate-section-div ul li:eq(1) a").html("ta的粉丝");
                $(".circle-follow-btn").css('display','none');
            }
        } else {
            $(".plate-section-title a").html("ta的关注");
            $(".plate-section-div ul li:eq(0) a").html("ta的关注");
            $(".plate-section-div ul li:eq(1) a").html("ta的粉丝");
            $(".circle-follow-btn").css('display','none');
        }

    })
}
//粉丝列表
fans(getId(),0);
$('.work-nav-fans-btn').click(function () {
    fans(getId(),0);
});
function fans(id,page) {
    axios({
        'url':'/api/follower/fans/'+id,
        'method':'get',
        'page':page
    }).then(function (res) {
        $(".fans-list-banner li").remove();
        const userList = res.data.objectList;
        for (let index=0;index<userList.length;index++){
            let user ={
                "id": userList[index].id,
                "nickname": userList[index].nickname,
                "headUrl": userList[index].headUrl,
                "signature":userList[index].signature
            }
            $(".fans-list-banner").append("<li data-id="+user.id+">\n" +
                "<a href=\"javascript:void(0);\" class=\"circle-list-head\">\n" +
                "<img src="+user.headUrl+">\n" +
                "</a>\n" +
                "<div class=\"circle-list-text\">\n" +
                "<a href=/userCenter-hot/"+user.id+">\n" +
                user.nickname+
                "</a>\n" +
                "<span>\n" +
                user.signature +
                "</span>\n" +
                "</div>\n" +
                "<a href=\"javascript:void(0);\" class=\"circle-follow-btn\">\n" +
                "+ 关注"+
                "</a>\n" +
                "</li>");
                axios({
                    'url':'/api/follower/checkFollower/'+user.id,
                    'method':'get'
                }).then(function (res) {
                    let f =  $(".fans-list-banner .circle-follow-btn:eq("+index+")");
                    if (res){
                       f.addClass('followed');
                       f.text('✔ 已关注');
                    }else {
                        f.addClass('follow')
                        f.text('+ 关注');
                    }
                });
                //非自己隐藏按钮
                if (cookie!=null){
                    if (JSON.parse(localStorage.user).id!=getId()){
                        $(".circle-follow-btn").css('display','none');
                    }
                }else {
                    $(".circle-follow-btn").css('display','none');
                }
        }
    })
}
//关注or不关注
$(document).on('click','.follow-cancel',function(){
    const _this = $(this);
    layer.confirm('是否取消关注这名作者', {
        btn: ['确定','取消'] //按钮
    }, function(){
        axios({
            'url':"/api/follower/"+_this.parent().data("id"),
            'method':'post'
        }).then(function () {
            const follow = $(".circle-intro .followerNum");
            follow.html(Number(follow.html())-1)
            _this.removeClass('followed');
            _this.removeClass('follow-cancel');
            _this.addClass('follow');
            _this.text('+ 关注');
            layer.msg('删除成功');
        })
    }, function(){

    });
});
$(document).on('click','.follow',function(){
    axios({
        'url':"/api/follower/"+ $(this).parent().data("id"),
        'method':'post'
    }).then(function (res) {
        const follow = $(".circle-intro .followerNum");
        follow.html(Number(follow.html())+1)
    })
});