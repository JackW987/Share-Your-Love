userInfo(getId())
function userInfo(id) {
    axios({
        'url':'/api/user/info/'+id,
        'method':'get'
    }).then(function (res) {
        if (cookie!=null){
            if (JSON.parse(localStorage.user).id!=getId()){
                disable()
            }
        }else {
            disable()
        }
        const userInfo = res.data.userInfo;
        $(".name-input:eq(0)").attr("placeholder",userInfo.nickname);
        $(".dataTime").attr("placeholder",userInfo.birthday);
        if (userInfo.sex==="男"){
            $(".person-msg-top input:eq(0)").attr("checked","checked");
        }else if (userInfo.sex==="女"){
            $(".person-msg-top input:eq(1)").attr("checked","checked");
        }else {
            $(".person-msg-top input:eq(3)").attr("checked","checked");
        }
        $("#hometown").distpicker('destroy');
        $('#hometown').distpicker({
            province:userInfo.province,
            city:userInfo.city,
            district:userInfo.zone,
            autoSelect: false,
            placeholder: true
        });
        $(".introduction").attr("placeholder",userInfo.introduction);
    });
}
//更新个人信息
$(".save-msg-btn").click(function () {
    let nickname = $(".name-input:eq(0)").val();
    if (nickname===''){
        nickname = $(".name-input:eq(0)").attr("placeholder")
    }
    let birthday = $(".dataTime").val()
    if (birthday===''){
        birthday = $(".dataTime").attr("placeholder")
    }
    let sex = "保密";
    let num = $(".person-msg-top input[name='sex']:checked").val();
    if (num==="1"){
        sex = "男"
    }else if (num==="2"){
        sex = "女"
    }
    let province = $('#province option:selected').text()
    let city = $('#city option:selected').text()
    let zone = $('#strict option:selected').text()
    let introduction = $(".introduction").val();
    if (introduction ===''){
        introduction = $(".introduction").attr("placeholder")
    }
    axios({
        'url':'/api/user/info',
        'method':'post',
        'data':{
            'nickname':nickname,
            'birthday':birthday,
            'sex':sex,
            'province':province,
            'city':city,
            'zone':zone,
            'introduction':introduction
        }
    }).then(function (res) {
        if (res.code===0){
            layer.msg(res.msg)
            return
        }
        const user = JSON.parse(localStorage.user);
        user.nickname = nickname;
        localStorage.user = JSON.stringify(user);
        $(".user-box-right span").html(nickname);
        $(".userCenter-top-info .head-basic span").html(nickname)
        layer.msg("保存成功")
    })
});
//消息通知
if (cookie!=null){
    if (JSON.parse(localStorage.user).id==getId()){
        messages();
    }
}
function messages() {
    axios({
        'url':'/api/user/messages',
        'method':'get'
    }).then(function (res) {
        const messages = res.data.objectList;
        for (let index=0;index<messages.length;index++){
            let message = messages[index]
            let type = message.type;
            if (type==="follow"){
                $(".info-comment-box ul").append("<li class=\"clearfix\">\n" +
                    "<div class=\"time-stamp\">\n" +
                    "<span>\n" +
                    message.date +
                    "</span>\n" +
                    "</div>\n" +
                    "<div class=\"msg-text-detail\">\n" +
                    "<img src="+message.headUrl+" alt=\"admin\">\n" +
                    "<p>\n" +
                    " <span class=\"detail-title\">\n" +
                    "【关注】" +   message.nickname+message.content+
                    "</span>\n" +
                    "</p>\n" +
                    "</div>\n" +
                    "</li>");
            }else if (type==="articlePraise"||type==="videoPraise"){
                $(".info-comment-box ul").append("<li class=\"clearfix\">\n" +
                    "<div class=\"time-stamp\">\n" +
                    "<span>\n" +
                    message.date +
                    "</span>\n" +
                    "</div>\n" +
                    "<div class=\"msg-text-detail\">\n" +
                    "<img src="+message.headUrl+" alt=\"admin\">\n" +
                    "<p>\n" +
                   " <span class=\"detail-title\">\n" +
                    "【点赞】" +  message.nickname+message.content+
                    "</span>\n" +
                    "<span>\n" +
                    "点赞了您的"+message.topicTitle+"的作品" +
                    "</span>"+
                    "</p>\n" +
                    "</div>\n" +
                    "</li>");
            }else if (type==="comment") {
                $(".info-comment-box ul").append("<li class=\"clearfix\">\n" +
                    "<div class=\"time-stamp\">\n" +
                    "<span>\n" +
                    message.date +
                    "</span>\n" +
                    "</div>\n" +
                    "<div class=\"msg-text-detail\">\n" +
                    "<img src="+message.headUrl+" alt=\"admin\">\n" +
                    "<p>\n" +
                    " <span class=\"detail-title\">\n" +
                    "【评论】" +message.nickname+message.content+
                    "</span>\n" +
                    "<span>\n" +
                    "对您的"+message.topicTitle+"的作品做了评价“"+removeHTMLTag(message.comment)+"”\n" +
                    "</span>"+
                    "</p>\n" +
                    "</div>\n" +
                    "</li>");
            }else if (type==="reply"){
                $(".info-comment-box ul").append("<li class=\"clearfix\">\n" +
                    "<div class=\"time-stamp\">\n" +
                    "<span>\n" +
                    message.date +
                    "</span>\n" +
                    "</div>\n" +
                    "<div class=\"msg-text-detail\">\n" +
                    "<img src="+message.headUrl+" alt=\"admin\">\n" +
                    "<p>\n" +
                    " <span class=\"detail-title\">\n" +
                    "【回复】" +message.nickname+message.content+
                    "</span>\n" +
                    "<span>\n" +
                    "回复了你“"+removeHTMLTag(message.reply)+"”\n" +
                    "</span>"+
                    "</p>\n" +
                    "</div>\n" +
                    "</li>");
            }else if (type==="replyPraise") {
                $(".info-comment-box ul").append("<li class=\"clearfix\">\n" +
                    "<div class=\"time-stamp\">\n" +
                    "<span>\n" +
                    message.date +
                    "</span>\n" +
                    "</div>\n" +
                    "<div class=\"msg-text-detail\">\n" +
                    "<img src="+message.headUrl+" alt=\"admin\">\n" +
                    "<p>\n" +
                    " <span class=\"detail-title\">\n" +
                    "【点赞】" +  message.nickname+message.content+
                    "</span>\n" +
                    "<span>\n" +
                    "点赞了你的回复“"+message.reply+"”\n" +
                    "</span>"+
                    "</p>\n" +
                    "</div>\n" +
                    "</li>");
            }else {
                $(".info-comment-box ul").append("<li class=\"clearfix\">\n" +
                    "<div class=\"time-stamp\">\n" +
                    "<span>\n" +
                    message.date +
                    "</span>\n" +
                    "</div>\n" +
                    "<div class=\"msg-text-detail\">\n" +
                    "<img src="+message.headUrl+" alt=\"admin\">\n" +
                    "<p>\n" +
                    " <span class=\"detail-title\">\n" +
                    "【点赞】" +  message.nickname+message.content+
                    "</span>\n" +
                    "<span>\n" +
                    "点赞了你的评论“"+removeHTMLTag(message.comment)+"”\n" +
                    "</span>"+
                    "</p>\n" +
                    "</div>\n" +
                    "</li>");
            }
        }
    })
}

function disable() {
    $(".plate-section-title a").html("ta的资料");
    $(".data-container-nav ul li:eq(0)").html("ta的资料")
    $(".name-input:eq(0)").attr('disabled','values');
    $(".dataTime").attr('disabled','values');
    $(".person-banner-mainbox tr:eq(4)").hide();
    $(".introduction").attr('disabled','values');
    $(".save-msg-btn").hide();
    $(".info-msg-btn").hide();
}

